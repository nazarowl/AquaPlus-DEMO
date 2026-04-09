'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuoteStore } from '@/lib/store';
import {
  POOL_MODELS, SPA_MODELS, BASE_COLORS, PREMIUM_COLORS, ALL_COLORS,
  POOL_ADDONS, SPA_ADDONS, getModelImage, getCollectionImages,
} from '@/lib/data';
import { fmt, calcTPS, calcTVQ } from '@/lib/utils';
import ProgressBar from '@/components/ProgressBar';
import ImageGallery from '@/components/ImageGallery';
import SuccessState from '@/components/SuccessState';

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

export default function SoumissionPage() {
  const store = useQuoteStore();
  const router = useRouter();
  const [direction, setDirection] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);

  function goStep(step: number) {
    setDirection(step > store.step ? 1 : -1);
    store.setStep(step);
  }

  const models = store.type === 'pool' ? POOL_MODELS : SPA_MODELS;
  const addons = store.type === 'pool' ? POOL_ADDONS : SPA_ADDONS;
  const premiumSurcharge = store.type === 'pool' ? 1500 : 800;
  const total = store.getTotal();
  const tps = calcTPS(total);
  const tvq = calcTVQ(total);

  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <AnimatePresence mode="wait" custom={direction}>
          {/* STEP 1: Choose Type */}
          {store.step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <div className="text-center py-12">
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-4xl font-heading font-bold text-navy mb-3"
                >
                  Configurez votre projet
                </motion.h2>
                <p className="text-text-secondary text-lg">
                  Obtenez une estimation de prix instantanée
                </p>
              </div>
              <div className="flex justify-center gap-8 flex-wrap">
                {[
                  {
                    type: 'pool' as const,
                    title: 'PISCINE',
                    price: '19 500 $',
                    img: '/collection/AQUARINO TOPAZE 1224 AQUA 4515 low.jpg',
                  },
                  {
                    type: 'spa' as const,
                    title: 'SPA ENCASTRÉ',
                    price: '8 500 $',
                    img: null,
                  },
                ].map((card) => (
                  <motion.div
                    key={card.type}
                    whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.12)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setDirection(1); store.setType(card.type); }}
                    className="w-[300px] bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] cursor-pointer overflow-hidden border-2 border-transparent hover:border-accent transition-colors"
                  >
                    <div className="h-[200px] bg-pale-blue flex items-center justify-center overflow-hidden relative">
                      {card.img ? (
                        <Image src={card.img} alt={card.title} fill className="object-cover" sizes="300px" />
                      ) : (
                        <svg className="w-20 h-20 opacity-40" viewBox="0 0 80 80" fill="none" stroke="#1C355E" strokeWidth="2">
                          <ellipse cx="40" cy="45" rx="28" ry="18" />
                          <path d="M25 30c3-8 6-5 8-12" /><path d="M38 28c2-8 5-5 7-12" /><path d="M50 30c3-8 6-5 8-12" />
                        </svg>
                      )}
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-heading font-bold text-navy">{card.title}</h3>
                      <p className="text-text-secondary text-sm mt-1">
                        À partir de <strong className="text-navy text-lg">{card.price}</strong>
                      </p>
                      <span className="text-cta font-semibold text-sm mt-3 inline-block">
                        Configurer &rarr;
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Select Model */}
          {store.step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <button onClick={() => goStep(1)} className="text-cta font-medium text-sm mb-4 hover:text-cta-hover flex items-center gap-1">
                &larr; Retour
              </button>
              <ProgressBar steps={['Modèle', 'Personnaliser', 'Options', 'Résumé']} active={1} />
              <h3 className="text-center text-xl font-heading font-bold text-navy mb-6">
                Étape 1 de 4 : Choisissez votre modèle
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {models.map((m, i) => {
                  const img = getModelImage(m.name, m.sizes[0].s);
                  return (
                    <motion.div
                      key={m.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -4 }}
                      onClick={() => { setDirection(1); store.setModel(m); }}
                      className={`bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] cursor-pointer overflow-hidden border-2 transition-all ${
                        store.model?.name === m.name
                          ? 'border-cta bg-cta/5'
                          : 'border-transparent hover:border-accent/50'
                      }`}
                    >
                      <div className="h-[140px] bg-pale-blue flex items-center justify-center overflow-hidden relative">
                        {img ? (
                          <Image src={img} alt={m.name} fill className="object-cover" sizes="280px" />
                        ) : (
                          <svg className="w-16 h-16 opacity-40" viewBox="0 0 80 80" fill="none" stroke="#1C355E" strokeWidth="2">
                            <ellipse cx="40" cy="45" rx="28" ry="18" />
                            <path d="M25 30c3-8 6-5 8-12" /><path d="M38 28c2-8 5-5 7-12" /><path d="M50 30c3-8 6-5 8-12" />
                          </svg>
                        )}
                      </div>
                      <div className="p-4 text-center">
                        <h4 className="font-bold text-navy">{m.name}</h4>
                        <span className="text-xs text-text-secondary">{m.sizes[0].s}</span>
                        <div className="font-bold text-navy mt-1">{fmt(m.sizes[0].p)}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 3: Size + Color */}
          {store.step === 3 && store.model && (
            <motion.div
              key="step3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <button onClick={() => goStep(2)} className="text-cta font-medium text-sm mb-4 hover:text-cta-hover flex items-center gap-1">
                &larr; Retour
              </button>
              <ProgressBar steps={['Modèle', 'Personnaliser', 'Options', 'Résumé']} active={2} />
              <h3 className="text-center text-xl font-heading font-bold text-navy mb-6">
                Étape 2 de 4 : Personnalisez
              </h3>

              {/* Gallery */}
              <div className="max-w-xl mx-auto mb-8">
                <ImageGallery images={getCollectionImages(store.model.name)} modelName={store.model.name} />
                {getCollectionImages(store.model.name).length === 0 && (
                  <div className="bg-pale-blue rounded-xl h-[200px] flex items-center justify-center">
                    {(() => {
                      const img = getModelImage(store.model.name, store.model.sizes[store.sizeIdx].s);
                      return img ? (
                        <Image src={img} alt={store.model.name} width={300} height={200} className="object-contain" />
                      ) : (
                        <svg className="w-20 h-20 opacity-40" viewBox="0 0 80 80" fill="none" stroke="#1C355E" strokeWidth="2">
                          <rect x="10" y="25" width="60" height="35" rx="8" />
                          <path d="M15 35c5-5 10 5 15 0s10 5 15 0s10 5 15 0" />
                        </svg>
                      );
                    })()}
                  </div>
                )}
              </div>

              {/* Size Selector */}
              {store.model.sizes.length > 1 && (
                <div className="mb-8">
                  <h4 className="font-semibold text-navy mb-3">Taille</h4>
                  <div className="flex gap-3 flex-wrap">
                    {store.model.sizes.map((sz, i) => (
                      <button
                        key={i}
                        onClick={() => store.setSizeIdx(i)}
                        className={`px-5 py-3 rounded-lg border-2 font-medium transition-all ${
                          store.sizeIdx === i
                            ? 'border-cta bg-cta/5 text-cta'
                            : 'border-border bg-white hover:border-accent'
                        }`}
                      >
                        {sz.s} ({fmt(sz.p)})
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Base Colors */}
              <div className="mb-6">
                <h4 className="text-sm text-text-secondary uppercase tracking-wider font-medium mb-4 pb-2 border-b border-border">
                  Couleurs de base (incluses)
                </h4>
                <div className="flex gap-4 flex-wrap">
                  {BASE_COLORS.map((c) => (
                    <div key={c.name} className="flex flex-col items-center cursor-pointer" onClick={() => store.setColor(c, false)}>
                      <div
                        className={`w-[100px] h-[80px] rounded-lg border-[3px] transition-all relative ${
                          store.color?.name === c.name ? 'border-cta' : 'border-transparent hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      >
                        {store.color?.name === c.name && (
                          <span className="absolute top-1 right-1 w-5 h-5 bg-cta rounded-full flex items-center justify-center text-white text-xs">
                            ✓
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-text-secondary mt-1.5">{c.name}</span>
                      <span className="text-xs text-cta font-medium">Inclus</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Colors */}
              <div className="mb-8">
                <h4 className="text-sm text-text-secondary uppercase tracking-wider font-medium mb-4 pb-2 border-b border-border">
                  Couleurs premium (+{fmt(premiumSurcharge)})
                </h4>
                <div className="flex gap-4 flex-wrap">
                  {PREMIUM_COLORS.map((c) => (
                    <div key={c.name} className="flex flex-col items-center cursor-pointer" onClick={() => store.setColor(c, true)}>
                      <div
                        className={`w-[100px] h-[80px] rounded-lg border-[3px] transition-all relative ${
                          store.color?.name === c.name ? 'border-cta' : 'border-transparent hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      >
                        {store.color?.name === c.name && (
                          <span className="absolute top-1 right-1 w-5 h-5 bg-cta rounded-full flex items-center justify-center text-white text-xs">
                            ✓
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-text-secondary mt-1.5">{c.name}</span>
                      <span className="text-xs text-cta font-semibold">+{fmt(premiumSurcharge)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => goStep(4)}
                  className="px-10 py-3.5 bg-cta text-white rounded-lg font-semibold hover:bg-cta-hover transition-colors"
                >
                  Continuer &rarr;
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Add-Ons */}
          {store.step === 4 && (
            <motion.div
              key="step4"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <button onClick={() => goStep(3)} className="text-cta font-medium text-sm mb-4 hover:text-cta-hover flex items-center gap-1">
                &larr; Retour
              </button>
              <ProgressBar steps={['Modèle', 'Personnaliser', 'Options', 'Résumé']} active={3} />
              <h3 className="text-center text-xl font-heading font-bold text-navy mb-6">
                Étape 3 de 4 : Options
              </h3>
              <div className="space-y-2 mb-28 max-w-2xl mx-auto">
                {addons.map((a, i) => {
                  const checked = store.addons.includes(i);
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ backgroundColor: 'rgba(121,199,238,0.06)' }}
                      onClick={() => store.toggleAddon(i)}
                      className={`flex items-center gap-4 p-4 bg-white rounded-lg cursor-pointer transition-all border-l-[3px] ${
                        checked ? 'border-l-cta bg-cta/[0.03]' : 'border-l-transparent'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {}}
                        className="w-5 h-5 accent-cta flex-shrink-0 pointer-events-none"
                      />
                      <span className="flex-1 font-medium text-[15px]">{a.name}</span>
                      {a.price !== null ? (
                        <span className="font-semibold text-navy whitespace-nowrap">+ {fmt(a.price)}</span>
                      ) : (
                        <span className="text-warning text-sm italic">Sur demande</span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 5: Summary */}
          {store.step === 5 && store.model && (
            <motion.div
              key="step5"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <button onClick={() => goStep(4)} className="text-cta font-medium text-sm mb-4 hover:text-cta-hover flex items-center gap-1">
                &larr; Retour
              </button>
              <ProgressBar steps={['Modèle', 'Personnaliser', 'Options', 'Résumé']} active={4} />
              <h3 className="text-center text-xl font-heading font-bold text-navy mb-6">
                Résumé de votre configuration
              </h3>
              <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-8 max-w-[700px] mx-auto">
                <div className="flex justify-between py-2 text-[15px]">
                  <span>Modèle:</span>
                  <strong>{store.model.name} {store.model.sizes[store.sizeIdx].s}</strong>
                </div>
                <div className="flex justify-between py-2 text-[15px]">
                  <span>Couleur:</span>
                  <strong>{store.color?.name}{store.premiumColor ? ' (premium)' : ''}</strong>
                </div>
                <div className="flex justify-between py-2 text-[15px]">
                  <span>Profondeur:</span>
                  <strong>{store.model.sizes[store.sizeIdx].d}</strong>
                </div>

                {store.addons.length > 0 && (
                  <>
                    <div className="border-t border-border my-3" />
                    <div className="font-semibold mb-2">Options sélectionnées:</div>
                    {store.addons.map((idx) => (
                      <div key={idx} className="flex justify-between py-1.5 text-[15px]">
                        <span>✓ {addons[idx].name}</span>
                        <span>{addons[idx].price ? fmt(addons[idx].price) : 'Sur demande'}</span>
                      </div>
                    ))}
                  </>
                )}

                <div className="border-t border-border my-3" />
                <div className="flex justify-between py-1.5 text-[15px]">
                  <span>{store.type === 'pool' ? 'Piscine' : 'Spa'} (base):</span>
                  <span>{fmt(store.model.sizes[store.sizeIdx].p)}</span>
                </div>
                {store.premiumColor && (
                  <div className="flex justify-between py-1.5 text-[15px]">
                    <span>Couleur premium:</span>
                    <span>{fmt(premiumSurcharge)}</span>
                  </div>
                )}
                {store.addons.length > 0 && (
                  <div className="flex justify-between py-1.5 text-[15px]">
                    <span>Options:</span>
                    <span>{fmt(store.addons.reduce((s, i) => s + (addons[i].price || 0), 0))}</span>
                  </div>
                )}
                <div className="flex justify-between py-1.5 text-[15px]">
                  <span>Sous-total:</span>
                  <span>{fmt(total)}</span>
                </div>
                <div className="flex justify-between py-1.5 text-[15px]">
                  <span>TPS (5%):</span>
                  <span>{fmt(tps)}</span>
                </div>
                <div className="flex justify-between py-1.5 text-[15px]">
                  <span>TVQ (9,975%):</span>
                  <span>{fmt(tvq)}</span>
                </div>
                <div className="flex justify-between py-3 mt-2 border-t-2 border-navy text-lg font-bold">
                  <span>ESTIMATION TOTALE:</span>
                  <span>{fmt(Math.round(total + tps + tvq))}</span>
                </div>
              </div>

              <div className="text-center text-sm text-text-secondary mt-5 py-3 px-4 bg-light-gray rounded-lg max-w-[700px] mx-auto">
                Ce prix est une estimation. Le prix final sera confirmé lors de votre soumission personnalisée.
              </div>

              <div className="flex flex-col items-center gap-3 mt-6">
                <button onClick={() => goStep(4)} className="text-cta text-sm font-medium hover:text-cta-hover">
                  &larr; Modifier
                </button>
                <button
                  onClick={() => { setModalOpen(true); setModalSuccess(false); }}
                  className="w-full max-w-[400px] py-3.5 bg-cta text-white rounded-lg font-semibold hover:bg-cta-hover transition-colors"
                >
                  Demander ma soumission &rarr;
                </button>
                <button
                  onClick={() => router.push('/reserver')}
                  className="w-full max-w-[400px] py-3.5 border-2 border-cta text-cta rounded-lg font-semibold hover:bg-cta/5 transition-colors"
                >
                  Réserver mon installation &rarr;
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* STICKY PRICE BAR */}
      <AnimatePresence>
        {store.step === 4 && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 h-20 bg-navy flex items-center justify-between px-8 z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.2)]"
          >
            <div className="text-white">
              <span className="text-sm block">Votre estimation</span>
              <strong className="text-2xl">{fmt(total + tps + tvq)}</strong>
            </div>
            <button
              onClick={() => goStep(5)}
              className="px-7 py-3 bg-white text-navy rounded-lg font-semibold hover:bg-light-gray transition-colors"
            >
              Voir mon résumé &rarr;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QUOTE REQUEST MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-navy/80 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="bg-white rounded-2xl max-w-[600px] w-full max-h-[90vh] overflow-y-auto p-8 relative"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-text-secondary hover:text-text-dark text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-light-gray"
              >
                &times;
              </button>

              {!modalSuccess ? (
                <>
                  <h3 className="text-center text-xl font-heading font-bold text-navy mb-6">
                    Demander votre soumission
                  </h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const inputs = form.querySelectorAll<HTMLInputElement>('input[required]');
                      let valid = true;
                      inputs.forEach((inp) => {
                        if (!inp.value.trim()) { inp.classList.add('border-error'); valid = false; }
                        else inp.classList.remove('border-error');
                      });
                      if (valid) setModalSuccess(true);
                    }}
                    className="space-y-4"
                  >
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
                      <label className="block text-sm text-text-secondary mb-1 font-medium">Ville *</label>
                      <input required className="w-full h-12 border border-border rounded-lg px-4 text-sm focus:border-cta focus:ring-2 focus:ring-cta/10 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm text-text-secondary mb-1 font-medium">Période souhaitée</label>
                      <select className="w-full h-12 border border-border rounded-lg px-4 text-sm focus:border-cta transition-all">
                        <option>Printemps</option><option>Été</option><option>Automne</option><option>Flexible</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-text-secondary mb-1 font-medium">Message</label>
                      <textarea className="w-full h-24 border border-border rounded-lg p-4 text-sm focus:border-cta focus:ring-2 focus:ring-cta/10 transition-all resize-y" placeholder="Détails supplémentaires..." />
                    </div>
                    {store.model && (
                      <div className="bg-light-gray rounded-lg p-4 text-sm text-text-secondary">
                        <strong>Votre configuration:</strong><br />
                        {store.model.name} {store.model.sizes[store.sizeIdx].s} | {store.color?.name} | {store.addons.length} option{store.addons.length !== 1 ? 's' : ''}<br />
                        Estimation: {fmt(Math.round(total + tps + tvq))}
                      </div>
                    )}
                    <button type="submit" className="w-full py-3.5 bg-cta text-white rounded-lg font-semibold hover:bg-cta-hover transition-colors">
                      Envoyer ma demande &rarr;
                    </button>
                  </form>
                </>
              ) : (
                <SuccessState title="Merci!">
                  <p className="text-text-secondary mb-6">
                    Votre demande a été envoyée. Notre équipe vous contactera dans les 24h.
                  </p>
                  <button
                    onClick={() => { setModalOpen(false); store.reset(); }}
                    className="px-8 py-3 bg-cta text-white rounded-lg font-semibold hover:bg-cta-hover transition-colors"
                  >
                    Retour à l&apos;accueil
                  </button>
                </SuccessState>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
