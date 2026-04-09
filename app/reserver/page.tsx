'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuoteStore } from '@/lib/store';
import { fmt, calcTPS, calcTVQ, generateResNumber } from '@/lib/utils';
import SuccessState from '@/components/SuccessState';

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

const PERIODS = [
  { name: 'PRINTEMPS', dates: 'Avr — Mai', avail: 4, color: 'green' as const, label: 'disponibles' },
  { name: 'ÉTÉ', dates: 'Juin — Août', avail: 2, color: 'orange' as const, label: 'Presque complet' },
  { name: 'AUTOMNE', dates: 'Sep — Oct', avail: 6, color: 'green' as const, label: 'disponibles' },
];

const WEEKS: Record<string, string[]> = {
  PRINTEMPS: ['Semaine du 6 avril', 'Semaine du 13 avril', 'Semaine du 20 avril', 'Semaine du 27 avril', 'Semaine du 4 mai', 'Semaine du 11 mai', 'Semaine du 18 mai', 'Semaine du 25 mai'],
  ÉTÉ: ['Semaine du 1 juin', 'Semaine du 8 juin', 'Semaine du 15 juin', 'Semaine du 22 juin', 'Semaine du 29 juin', 'Semaine du 6 juillet', 'Semaine du 13 juillet', 'Semaine du 20 juillet'],
  AUTOMNE: ['Semaine du 7 septembre', 'Semaine du 14 septembre', 'Semaine du 21 septembre', 'Semaine du 28 septembre', 'Semaine du 5 octobre', 'Semaine du 12 octobre', 'Semaine du 19 octobre'],
};

export default function ReserverPage() {
  const quote = useQuoteStore();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [period, setPeriod] = useState<string | null>(null);
  const [week, setWeek] = useState('');
  const [deposit, setDeposit] = useState(500);
  const [resNumber] = useState(generateResNumber);

  const total = quote.getTotal();
  const tps = calcTPS(total);
  const tvq = calcTVQ(total);
  const addons = quote.getAddons();

  function goStep(s: number) {
    setDirection(s > step ? 1 : -1);
    setStep(s);
  }

  if (!quote.model) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-text-secondary py-16">
          <p className="text-lg mb-4">Veuillez d&apos;abord configurer votre projet.</p>
          <button
            onClick={() => router.push('/soumission')}
            className="text-cta font-semibold hover:text-cta-hover transition-colors"
          >
            Aller à la soumission &rarr;
          </button>
        </div>
      </div>
    );
  }

  const periodMap: Record<string, string> = { PRINTEMPS: 'Printemps 2026', ÉTÉ: 'Été 2026', AUTOMNE: 'Automne 2026' };

  return (
    <div className="min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <AnimatePresence mode="wait" custom={direction}>
          {/* STEP 1: Period */}
          {step === 1 && (
            <motion.div key="b1" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}>
              <div className="text-center py-8">
                <h2 className="text-3xl font-heading font-bold text-navy mb-4">Réservez votre installation</h2>
                <div className="bg-white rounded-xl p-4 max-w-md mx-auto text-sm text-text-secondary mb-8">
                  <strong>Votre config:</strong> {quote.model.name} {quote.model.sizes[quote.sizeIdx].s} {quote.color?.name}<br />
                  <strong>Estimation:</strong> {fmt(Math.round(total + tps + tvq))}
                </div>
              </div>

              <div className="flex gap-5 justify-center flex-wrap mb-8">
                {PERIODS.map((p) => (
                  <motion.div
                    key={p.name}
                    whileHover={{ y: -4 }}
                    onClick={() => setPeriod(p.name)}
                    className={`w-[250px] bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6 text-center cursor-pointer border-2 transition-all ${
                      period === p.name ? 'border-cta' : 'border-transparent hover:border-accent'
                    }`}
                  >
                    <h4 className="text-lg font-bold text-navy">{p.name}</h4>
                    <div className="text-sm text-text-secondary mb-3">{p.dates}</div>
                    <div className="text-sm font-medium">
                      <span className={`inline-block w-2.5 h-2.5 rounded-full mr-1.5 ${p.color === 'green' ? 'bg-success' : 'bg-warning'}`} />
                      {p.avail} {p.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {period && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-sm mx-auto mb-8">
                  <label className="block text-sm font-medium mb-2">Semaine préférée (optionnel):</label>
                  <select
                    value={week}
                    onChange={(e) => setWeek(e.target.value)}
                    className="w-full h-12 border border-border rounded-lg px-4 text-sm focus:border-cta transition-all"
                  >
                    <option value="">Sélectionnez une semaine</option>
                    {WEEKS[period]?.map((w) => <option key={w} value={w}>{w}</option>)}
                  </select>
                </motion.div>
              )}

              <div className="text-center">
                <button
                  disabled={!period}
                  onClick={() => goStep(2)}
                  className={`px-10 py-3.5 rounded-lg font-semibold transition-colors ${
                    period ? 'bg-cta text-white hover:bg-cta-hover' : 'bg-border text-text-secondary cursor-not-allowed'
                  }`}
                >
                  Continuer &rarr;
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Deposit */}
          {step === 2 && (
            <motion.div key="b2" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}>
              <button onClick={() => goStep(1)} className="text-cta font-medium text-sm mb-6 hover:text-cta-hover flex items-center gap-1">
                &larr; Retour
              </button>
              <h2 className="text-center text-2xl font-heading font-bold text-navy mb-8">
                Choisissez votre dépôt
              </h2>
              <div className="max-w-md mx-auto space-y-4 mb-8">
                {[
                  { amount: 500, title: 'DÉPÔT STANDARD', desc: "Réserve votre plage d'installation", pop: false },
                  { amount: 1000, title: 'DÉPÔT PREMIUM', desc: 'Installation prioritaire + consultation design incluse', pop: true },
                ].map((d) => (
                  <motion.div
                    key={d.amount}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setDeposit(d.amount)}
                    className={`flex items-center gap-4 p-5 border-2 rounded-xl cursor-pointer transition-all relative ${
                      deposit === d.amount ? 'border-cta bg-cta/[0.03]' : 'border-border hover:border-accent'
                    }`}
                  >
                    <input type="radio" checked={deposit === d.amount} onChange={() => {}} className="w-5 h-5 accent-cta" />
                    <div>
                      <h4 className="font-semibold text-navy">{d.title}</h4>
                      <div className="text-xl font-bold text-cta">{fmt(d.amount)}</div>
                      <p className="text-sm text-text-secondary">{d.desc}</p>
                    </div>
                    {d.pop && (
                      <span className="absolute -top-2.5 right-4 bg-accent text-navy text-[11px] font-semibold px-3 py-1 rounded-full">
                        Populaire
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="text-center text-sm text-text-secondary mb-8 max-w-md mx-auto">
                ⓘ Votre dépôt sera déduit du montant total. Remboursable jusqu&apos;à 30 jours avant la date d&apos;installation.
              </div>

              <div className="text-center">
                <button onClick={() => goStep(3)} className="px-10 py-3.5 bg-cta text-white rounded-lg font-semibold hover:bg-cta-hover transition-colors">
                  Procéder au paiement &rarr;
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Payment */}
          {step === 3 && (
            <motion.div key="b3" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}>
              <div className="max-w-lg mx-auto">
                <button onClick={() => goStep(2)} className="text-cta font-medium text-sm mb-6 hover:text-cta-hover flex items-center gap-1">
                  &larr; Retour
                </button>
                <h2 className="text-center text-2xl font-heading font-bold text-navy mb-6">
                  Paiement sécurisé 🔒
                </h2>
                <form onSubmit={(e) => { e.preventDefault(); goStep(4); }} className="space-y-4">
                  <div>
                    <label className="block text-sm text-text-secondary mb-1 font-medium">Numéro de carte</label>
                    <input required placeholder="1234 5678 9012 3456" className="w-full h-12 border border-border rounded-lg px-4 text-sm focus:border-cta focus:ring-2 focus:ring-cta/10 transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-text-secondary mb-1 font-medium">Date d&apos;expiration</label>
                      <input required placeholder="MM/AA" className="w-full h-12 border border-border rounded-lg px-4 text-sm focus:border-cta focus:ring-2 focus:ring-cta/10 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm text-text-secondary mb-1 font-medium">CVC</label>
                      <input required placeholder="123" className="w-full h-12 border border-border rounded-lg px-4 text-sm focus:border-cta focus:ring-2 focus:ring-cta/10 transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-text-secondary mb-1 font-medium">Nom sur la carte</label>
                    <input required className="w-full h-12 border border-border rounded-lg px-4 text-sm focus:border-cta focus:ring-2 focus:ring-cta/10 transition-all" />
                  </div>
                  <div className="bg-light-gray rounded-xl p-5 mt-4">
                    <div className="flex justify-between text-sm py-1">
                      <span>Dépôt de réservation</span>
                      <span>{fmt(deposit)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-base py-2 border-t border-border mt-2">
                      <span>TOTAL</span>
                      <span>{fmt(deposit)}</span>
                    </div>
                  </div>
                  <button type="submit" className="w-full py-3.5 bg-cta text-white rounded-lg font-semibold hover:bg-cta-hover transition-colors mt-2">
                    Confirmer le paiement &rarr;
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Confirmation */}
          {step === 4 && (
            <motion.div key="b4" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}>
              <SuccessState title="Réservation confirmée">
                <p className="text-text-secondary mb-1">
                  Numéro de réservation: <strong>{resNumber}</strong>
                </p>
              </SuccessState>

              <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-8 max-w-[600px] mx-auto mt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Période:</span><strong>{period ? periodMap[period] : ''}</strong></div>
                  {week && <div className="flex justify-between"><span>Semaine:</span><strong>{week}</strong></div>}
                  <div className="flex justify-between"><span>Dépôt payé:</span><strong>{fmt(deposit)}</strong></div>
                  <div className="flex justify-between"><span>Modèle:</span><strong>{quote.model?.name} {quote.model?.sizes[quote.sizeIdx].s} — {quote.color?.name}</strong></div>
                  {quote.addons.length > 0 && (
                    <div className="flex justify-between"><span>Options:</span><strong>{quote.addons.map((i) => addons[i]?.name).join(', ')}</strong></div>
                  )}
                  <div className="flex justify-between"><span>Estimation:</span><strong>{fmt(Math.round(total + tps + tvq))}</strong></div>
                </div>
                <div className="mt-6 p-4 bg-light-gray rounded-lg text-sm text-text-secondary">
                  <strong>Prochaines étapes:</strong><br />
                  Notre équipe vous contactera dans les 48h pour confirmer les détails de votre projet.<br /><br />
                  📧 Un courriel de confirmation a été envoyé.
                </div>
              </div>

              <div className="flex justify-center gap-4 flex-wrap mt-8">
                <button
                  onClick={() => alert('Événement ajouté au calendrier (simulé)')}
                  className="px-6 py-3 border-2 border-cta text-cta rounded-lg font-semibold hover:bg-cta/5 transition-colors"
                >
                  Ajouter au calendrier
                </button>
                <button
                  onClick={() => { quote.reset(); router.push('/'); }}
                  className="px-6 py-3 bg-cta text-white rounded-lg font-semibold hover:bg-cta-hover transition-colors"
                >
                  Retour à l&apos;accueil
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
