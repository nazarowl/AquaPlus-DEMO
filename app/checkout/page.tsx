'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/store';
import { SHIPPING_OPTIONS } from '@/lib/data';
import { fmtDec, calcTPS, calcTVQ, generateOrderNumber } from '@/lib/utils';
import ProgressBar from '@/components/ProgressBar';
import SuccessState from '@/components/SuccessState';

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [shipping, setShipping] = useState(0);
  const [orderNumber] = useState(generateOrderNumber);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipPrice = SHIPPING_OPTIONS[shipping].price;
  const taxable = subtotal + shipPrice;
  const tps = calcTPS(taxable);
  const tvq = calcTVQ(taxable);
  const total = taxable + tps + tvq;
  const itemCount = items.reduce((s, i) => s + i.qty, 0);

  function goStep(s: number) {
    setDirection(s > step ? 1 : -1);
    setStep(s);
  }

  if (items.length === 0 && step < 4) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-text-secondary py-16">
          <p className="text-lg mb-4">Votre panier est vide.</p>
          <button onClick={() => router.push('/boutique')} className="text-cta font-semibold hover:text-cta-hover">
            Parcourir la boutique &rarr;
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-[800px] mx-auto px-6 py-8">
        <AnimatePresence mode="wait" custom={direction}>
          {/* STEP 1: Shipping Info */}
          {step === 1 && (
            <motion.div key="c1" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}>
              <button onClick={() => router.push('/boutique')} className="text-cta font-medium text-sm mb-6 hover:text-cta-hover flex items-center gap-1">
                &larr; Retour à la boutique
              </button>
              <ProgressBar steps={['Livraison', 'Expédition', 'Paiement']} active={1} />
              <h2 className="text-center text-2xl font-heading font-bold text-navy mb-6">Livraison</h2>
              <form onSubmit={(e) => { e.preventDefault(); goStep(2); }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-text-secondary mb-1 font-medium">Prénom *</label>
                    <input required className="w-full h-12 border border-border rounded-lg px-4 text-sm focus:border-cta focus:ring-2 focus:ring-cta/10 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm text-text-secondary mb-1 font-medium">Nom *</label>
                    <input required className="w-full h-12 border border-border rounded-lg px-4 text-sm focus:border-cta focus:ring-2 focus:ring-cta/10 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1 font-medium">Courriel *</label>
                  <input type="email" required className="w-full h-12 border border-border rounded-lg px-4 text-sm focus:border-cta focus:ring-2 focus:ring-cta/10 transition-all" />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1 font-medium">Téléphone *</label>
                  <input type="tel" required className="w-full h-12 border border-border rounded-lg px-4 text-sm focus:border-cta focus:ring-2 focus:ring-cta/10 transition-all" />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1 font-medium">Adresse *</label>
                  <input required className="w-full h-12 border border-border rounded-lg px-4 text-sm focus:border-cta focus:ring-2 focus:ring-cta/10 transition-all" />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1 font-medium">Appartement</label>
                  <input className="w-full h-12 border border-border rounded-lg px-4 text-sm focus:border-cta focus:ring-2 focus:ring-cta/10 transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-text-secondary mb-1 font-medium">Ville *</label>
                    <input required className="w-full h-12 border border-border rounded-lg px-4 text-sm focus:border-cta focus:ring-2 focus:ring-cta/10 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm text-text-secondary mb-1 font-medium">Province *</label>
                    <select required className="w-full h-12 border border-border rounded-lg px-4 text-sm focus:border-cta transition-all">
                      <option>Québec</option><option>Ontario</option><option>Nouveau-Brunswick</option><option>Alberta</option><option>Colombie-Britannique</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1 font-medium">Code postal *</label>
                  <input required placeholder="A1A 1A1" className="w-full h-12 border border-border rounded-lg px-4 text-sm focus:border-cta focus:ring-2 focus:ring-cta/10 transition-all" />
                </div>
                <button type="submit" className="w-full py-3.5 bg-cta text-white rounded-lg font-semibold hover:bg-cta-hover transition-colors mt-4">
                  Continuer &rarr;
                </button>
              </form>
            </motion.div>
          )}

          {/* STEP 2: Shipping Method */}
          {step === 2 && (
            <motion.div key="c2" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}>
              <button onClick={() => goStep(1)} className="text-cta font-medium text-sm mb-6 hover:text-cta-hover flex items-center gap-1">
                &larr; Retour
              </button>
              <ProgressBar steps={['Livraison', 'Expédition', 'Paiement']} active={2} />
              <h2 className="text-center text-2xl font-heading font-bold text-navy mb-6">Mode de livraison</h2>
              <div className="space-y-3 mb-8">
                {SHIPPING_OPTIONS.map((opt, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setShipping(i)}
                    className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      shipping === i ? 'border-cta bg-cta/[0.03]' : 'border-border hover:border-accent'
                    }`}
                  >
                    <input type="radio" checked={shipping === i} onChange={() => {}} className="w-5 h-5 accent-cta" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-navy text-[15px]">{opt.name}</h4>
                      <p className="text-sm text-text-secondary">{opt.desc}</p>
                    </div>
                    <span className="font-semibold text-navy whitespace-nowrap">{opt.label}</span>
                  </motion.div>
                ))}
              </div>
              <button onClick={() => goStep(3)} className="w-full py-3.5 bg-cta text-white rounded-lg font-semibold hover:bg-cta-hover transition-colors">
                Continuer &rarr;
              </button>
            </motion.div>
          )}

          {/* STEP 3: Payment */}
          {step === 3 && (
            <motion.div key="c3" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}>
              <button onClick={() => goStep(2)} className="text-cta font-medium text-sm mb-6 hover:text-cta-hover flex items-center gap-1">
                &larr; Retour
              </button>
              <ProgressBar steps={['Livraison', 'Expédition', 'Paiement']} active={3} />
              <h2 className="text-center text-2xl font-heading font-bold text-navy mb-6">Paiement sécurisé 🔒</h2>
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
                  <h4 className="font-semibold text-navy mb-3">Résumé</h4>
                  <div className="flex justify-between text-sm py-1">
                    <span>{itemCount} article{itemCount !== 1 ? 's' : ''}</span>
                    <span>{fmtDec(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm py-1">
                    <span>{SHIPPING_OPTIONS[shipping].name}</span>
                    <span>{SHIPPING_OPTIONS[shipping].label}</span>
                  </div>
                  <div className="flex justify-between text-sm py-1">
                    <span>TPS (5%)</span>
                    <span>{fmtDec(tps)}</span>
                  </div>
                  <div className="flex justify-between text-sm py-1">
                    <span>TVQ (9,975%)</span>
                    <span>{fmtDec(tvq)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base py-2.5 border-t border-border mt-2">
                    <span>TOTAL</span>
                    <span>{fmtDec(total)}</span>
                  </div>
                </div>
                <button type="submit" className="w-full py-3.5 bg-cta text-white rounded-lg font-semibold hover:bg-cta-hover transition-colors mt-2">
                  Confirmer le paiement &rarr;
                </button>
              </form>
            </motion.div>
          )}

          {/* STEP 4: Confirmation */}
          {step === 4 && (
            <motion.div key="c4" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}>
              <SuccessState title="Merci pour votre commande!">
                <p className="text-text-secondary">
                  Numéro de commande: <strong>{orderNumber}</strong>
                </p>
                <p className="text-text-secondary text-sm mt-1">
                  Un courriel de confirmation a été envoyé.
                </p>
              </SuccessState>
              <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-8 max-w-[600px] mx-auto mt-4">
                <h3 className="font-heading font-bold text-navy text-lg mb-4">Résumé de la commande</h3>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between py-1.5 text-sm">
                    <span>{item.name} × {item.qty}</span>
                    <span>{fmtDec(item.price * item.qty)}</span>
                  </div>
                ))}
                <div className="border-t border-border my-3" />
                <div className="flex justify-between font-bold">
                  <span>Total payé</span>
                  <span>{fmtDec(total)}</span>
                </div>
              </div>
              <div className="text-center mt-8">
                <button
                  onClick={() => { clearCart(); router.push('/boutique'); }}
                  className="px-8 py-3.5 bg-cta text-white rounded-lg font-semibold hover:bg-cta-hover transition-colors"
                >
                  Retour à la boutique
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
