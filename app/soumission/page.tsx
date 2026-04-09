'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuoteStore } from '@/lib/store';
import {
  POOL_MODELS, SPA_MODELS, BASE_COLORS, PREMIUM_COLORS,
  POOL_ADDONS, SPA_ADDONS, getModelImage, getCollectionImages, COLLECTION_IMAGES,
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

  // Pick a few showcase images for the step 1 background strip
  const showcaseImages = [
    '/collection/AQUARINO TOPAZE 1224 AQUA 4515 low.jpg',
    '/collection/AQUARINO LAZULI 1232 GALAXY 4183 low.jpg',
    '/collection/AQUARINO OPALE 816 ARCTICGREY 8525 low.jpg',
    '/collection/AQUARINO TANZA Option 01 low.jpg',
  ];

  return (
    <div className="min-h-screen pb-24">
      <AnimatePresence mode="wait" custom={direction}>
        {/* ========== STEP 1: Choose Type ========== */}
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
            {/* Hero banner */}
            <div className="relative bg-navy overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <Image
                  src="/collection/AQUARINO TOPAZE 1226 PACIFIC 9899 low.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-navy/60 to-navy" />
              <div className="relative z-10 max-w-3xl mx-auto text-center px-6 py-20">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-accent text-sm font-medium border border-white/20 mb-4"
                >
                  Configurateur en ligne
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-5xl font-heading font-bold text-white mb-4"
                >
                  Configurez votre projet
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white/70 text-lg max-w-lg mx-auto"
                >
                  Choisissez votre modèle, personnalisez les couleurs et options, et obtenez une estimation de prix instantanée.
                </motion.p>
              </div>
            </div>

            {/* Type cards */}
            <div className="max-w-[1200px] mx-auto px-6 -mt-8 relative z-20">
              <div className="flex justify-center gap-8 flex-wrap">
                {/* Pool card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(0,0,0,0.15)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setDirection(1); store.setType('pool'); }}
                  className="w-[340px] bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] cursor-pointer overflow-hidden border-2 border-transparent hover:border-accent transition-all"
                >
                  <div className="h-[220px] overflow-hidden relative">
                    <Image
                      src="/collection/AQUARINO TOPAZE 1224 AQUA 4515 low.jpg"
                      alt="Piscine"
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="340px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-heading font-bold text-navy">PISCINE</h3>
                    <p className="text-text-secondary text-sm mt-1">Piscines creusées en fibre de verre</p>
                    <p className="mt-3">
                      <span className="text-text-secondary text-sm">À partir de </span>
                      <strong className="text-navy text-xl">19 500 $</strong>
                    </p>
                    <div className="mt-4 px-6 py-2.5 bg-cta/10 text-cta rounded-lg font-semibold text-sm inline-block">
                      Configurer ma piscine &rarr;
                    </div>
                  </div>
                </motion.div>

                {/* Spa card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(0,0,0,0.15)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setDirection(1); store.setType('spa'); }}
                  className="w-[340px] bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] cursor-pointer overflow-hidden border-2 border-transparent hover:border-accent transition-all"
                >
                  <div className="h-[220px] overflow-hidden relative bg-gradient-to-br from-[#1a3a5c] via-[#2a5a7c] to-[#79C7EE]">
                    {/* Decorative spa visual */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-40 h-28 rounded-[50%] border-2 border-white/30 relative overflow-hidden">
                          <div className="absolute inset-0 bg-white/5" />
                          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-accent/30 to-transparent" />
                        </div>
                        {/* Steam lines */}
                        <motion.div
                          animate={{ y: [-2, -14, -2], opacity: [0.3, 0.7, 0.3] }}
                          transition={{ repeat: Infinity, duration: 3, delay: 0 }}
                          className="absolute -top-6 left-8 w-0.5 h-8 bg-gradient-to-t from-white/40 to-transparent rounded-full"
                        />
                        <motion.div
                          animate={{ y: [-2, -16, -2], opacity: [0.2, 0.6, 0.2] }}
                          transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                          className="absolute -top-8 left-16 w-0.5 h-10 bg-gradient-to-t from-white/40 to-transparent rounded-full"
                        />
                        <motion.div
                          animate={{ y: [-2, -12, -2], opacity: [0.3, 0.5, 0.3] }}
                          transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                          className="absolute -top-5 left-24 w-0.5 h-7 bg-gradient-to-t from-white/40 to-transparent rounded-full"
                        />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-center">
                      <span className="text-white/60 text-xs">5 modèles disponibles</span>
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-heading font-bold text-navy">SPA ENCASTRÉ</h3>
                    <p className="text-text-secondary text-sm mt-1">Spas encastrés haut de gamme</p>
                    <p className="mt-3">
                      <span className="text-text-secondary text-sm">À partir de </span>
                      <strong className="text-navy text-xl">8 500 $</strong>
                    </p>
                    <div className="mt-4 px-6 py-2.5 bg-cta/10 text-cta rounded-lg font-semibold text-sm inline-block">
                      Configurer mon spa &rarr;
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Showcase gallery strip */}
            <div className="max-w-[1200px] mx-auto px-6 mt-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-center text-lg font-heading font-semibold text-navy mb-6">
                  Nos réalisations récentes
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {showcaseImages.map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="relative aspect-[4/3] rounded-xl overflow-hidden group"
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="max-w-[1200px] mx-auto px-6 mt-12 mb-8"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: '✓', title: 'Sans engagement', desc: 'Estimation gratuite' },
                  { icon: '⚡', title: 'Résultat instantané', desc: 'Prix en temps réel' },
                  { icon: '🎨', title: '6 couleurs', desc: 'Collection exclusive' },
                  { icon: '📋', title: 'Soumission détaillée', desc: 'Envoyée sous 24h' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-[0_1px_6px_rgba(0,0,0,0.06)]">
                    <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <div className="font-semibold text-navy text-sm">{item.title}</div>
                      <div className="text-text-secondary text-xs">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ========== STEP 2: Select Model ========== */}
        {store.step === 2 && (
          <motion.div
            key="step2"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="max-w-[1200px] mx-auto px-6 py-8"
          >
            <button onClick={() => goStep(1)} className="text-cta font-medium text-sm mb-4 hover:text-cta-hover flex items-center gap-1">
              &larr; Retour
            </button>
            <ProgressBar steps={['Modèle', 'Personnaliser', 'Options', 'Résumé']} active={1} />
            <h3 className="text-center text-xl font-heading font-bold text-navy mb-2">
              Étape 1 de 4 : Choisissez votre modèle
            </h3>
            <p className="text-center text-text-secondary text-sm mb-8">
              {store.type === 'pool' ? '10 modèles de piscines creusées en fibre de verre' : '5 modèles de spas encastrés haut de gamme'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {models.map((m, i) => {
                const img = getModelImage(m.name, m.sizes[0].s);
                const collectionImg = COLLECTION_IMAGES[m.name]?.[0];
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
                    <div className="h-[160px] bg-pale-blue flex items-center justify-center overflow-hidden relative group">
                      {collectionImg ? (
                        <Image src={collectionImg} alt={m.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="280px" />
                      ) : img ? (
                        <Image src={img} alt={m.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="280px" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#1a3a5c] via-[#2a5a7c] to-accent/60 flex items-center justify-center">
                          <span className="text-white/70 font-heading font-bold text-lg">{m.name}</span>
                        </div>
                      )}
                      {m.sizes.length > 1 && (
                        <span className="absolute top-2 right-2 bg-navy/70 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
                          {m.sizes.length} tailles
                        </span>
                      )}
                    </div>
                    <div className="p-4 text-center">
                      <h4 className="font-bold text-navy text-[15px]">{m.name}</h4>
                      <span className="text-xs text-text-secondary">{m.sizes[0].s} · Prof. {m.sizes[0].d}</span>
                      <div className="font-bold text-cta mt-1.5 text-lg">{fmt(m.sizes[0].p)}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ========== STEP 3: Size + Color ========== */}
        {store.step === 3 && store.model && (
          <motion.div
            key="step3"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="max-w-[1200px] mx-auto px-6 py-8"
          >
            <button onClick={() => goStep(2)} className="text-cta font-medium text-sm mb-4 hover:text-cta-hover flex items-center gap-1">
              &larr; Retour
            </button>
            <ProgressBar steps={['Modèle', 'Personnaliser', 'Options', 'Résumé']} active={2} />
            <h3 className="text-center text-xl font-heading font-bold text-navy mb-6">
              Étape 2 de 4 : Personnalisez
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {/* Left: Gallery */}
              <div>
                {getCollectionImages(store.model.name).length > 0 ? (
                  <ImageGallery images={getCollectionImages(store.model.name)} modelName={store.model.name} />
                ) : (
                  <div className="bg-pale-blue rounded-xl aspect-[4/3] flex items-center justify-center overflow-hidden relative">
                    {(() => {
                      const img = getModelImage(store.model.name, store.model.sizes[store.sizeIdx].s);
                      return img ? (
                        <Image src={img} alt={store.model.name} fill className="object-contain p-4" sizes="500px" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#1a3a5c] via-[#2a5a7c] to-accent/60 flex items-center justify-center">
                          <span className="text-white/80 font-heading font-bold text-2xl">{store.model.name}</span>
                        </div>
                      );
                    })()}
                  </div>
                )}
                {/* Model info card */}
                <div className="bg-white rounded-xl p-5 mt-4 shadow-[0_1px_6px_rgba(0,0,0,0.06)]">
                  <h4 className="font-heading font-bold text-navy text-lg">{store.model.name}</h4>
                  <div className="flex gap-4 mt-2 text-sm text-text-secondary">
                    <span>Taille: <strong className="text-navy">{store.model.sizes[store.sizeIdx].s}</strong></span>
                    <span>Profondeur: <strong className="text-navy">{store.model.sizes[store.sizeIdx].d}</strong></span>
                  </div>
                  <div className="mt-2 text-cta font-bold text-xl">{fmt(store.model.sizes[store.sizeIdx].p)}</div>
                </div>
              </div>

              {/* Right: Options */}
              <div>
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
                          className={`w-[100px] h-[80px] rounded-lg border-[3px] transition-all relative shadow-sm ${
                            store.color?.name === c.name ? 'border-cta shadow-cta/20' : 'border-transparent hover:scale-105'
                          }`}
                          style={{ backgroundColor: c.hex }}
                        >
                          {store.color?.name === c.name && (
                            <span className="absolute top-1 right-1 w-5 h-5 bg-cta rounded-full flex items-center justify-center text-white text-xs">✓</span>
                          )}
                        </div>
                        <span className="text-xs text-text-secondary mt-1.5">{c.name}</span>
                        <span className="text-xs text-success font-medium">Inclus</span>
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
                          className={`w-[100px] h-[80px] rounded-lg border-[3px] transition-all relative shadow-sm ${
                            store.color?.name === c.name ? 'border-cta shadow-cta/20' : 'border-transparent hover:scale-105'
                          }`}
                          style={{ backgroundColor: c.hex }}
                        >
                          {store.color?.name === c.name && (
                            <span className="absolute top-1 right-1 w-5 h-5 bg-cta rounded-full flex items-center justify-center text-white text-xs">✓</span>
                          )}
                        </div>
                        <span className="text-xs text-text-secondary mt-1.5">{c.name}</span>
                        <span className="text-xs text-cta font-semibold">+{fmt(premiumSurcharge)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => goStep(4)}
                  className="w-full py-3.5 bg-cta text-white rounded-lg font-semibold hover:bg-cta-hover transition-colors text-lg"
                >
                  Continuer &rarr;
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========== STEP 4: Add-Ons ========== */}
        {store.step === 4 && (
          <motion.div
            key="step4"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="max-w-[1200px] mx-auto px-6 py-8"
          >
            <button onClick={() => goStep(3)} className="text-cta font-medium text-sm mb-4 hover:text-cta-hover flex items-center gap-1">
              &larr; Retour
            </button>
            <ProgressBar steps={['Modèle', 'Personnaliser', 'Options', 'Résumé']} active={3} />
            <h3 className="text-center text-xl font-heading font-bold text-navy mb-2">
              Étape 3 de 4 : Options
            </h3>
            <p className="text-center text-text-secondary text-sm mb-8">
              Ajoutez des options pour personnaliser votre {store.type === 'pool' ? 'piscine' : 'spa'}
            </p>
            <div className="space-y-2 mb-28 max-w-2xl mx-auto">
              {addons.map((a, i) => {
                const checked = store.addons.includes(i);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ backgroundColor: 'rgba(121,199,238,0.06)' }}
                    onClick={() => store.toggleAddon(i)}
                    className={`flex items-center gap-4 p-5 bg-white rounded-xl cursor-pointer transition-all border-l-[3px] shadow-[0_1px_4px_rgba(0,0,0,0.04)] ${
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

        {/* ========== STEP 5: Summary ========== */}
        {store.step === 5 && store.model && (
          <motion.div
            key="step5"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="max-w-[1200px] mx-auto px-6 py-8"
          >
            <button onClick={() => goStep(4)} className="text-cta font-medium text-sm mb-4 hover:text-cta-hover flex items-center gap-1">
              &larr; Retour
            </button>
            <ProgressBar steps={['Modèle', 'Personnaliser', 'Options', 'Résumé']} active={4} />
            <h3 className="text-center text-xl font-heading font-bold text-navy mb-6">
              Résumé de votre configuration
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Left: Image */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.08)] sticky top-24">
                  <div className="aspect-square relative bg-pale-blue">
                    {(() => {
                      const collImg = COLLECTION_IMAGES[store.model.name]?.[0];
                      const modelImg = getModelImage(store.model.name, store.model.sizes[store.sizeIdx].s);
                      const img = collImg || modelImg;
                      return img ? (
                        <Image src={img} alt={store.model.name} fill className="object-cover" sizes="400px" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#1a3a5c] to-accent/60 flex items-center justify-center">
                          <span className="text-white/80 font-heading font-bold text-xl">{store.model.name}</span>
                        </div>
                      );
                    })()}
                  </div>
                  <div className="p-4 text-center">
                    <h4 className="font-heading font-bold text-navy">{store.model.name} {store.model.sizes[store.sizeIdx].s}</h4>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <div className="w-6 h-6 rounded-full border-2 border-border" style={{ backgroundColor: store.color?.hex }} />
                      <span className="text-sm text-text-secondary">{store.color?.name}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Breakdown */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-8">
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
                      <div className="font-semibold mb-2 text-sm text-text-secondary uppercase tracking-wider">Options sélectionnées</div>
                      {store.addons.map((idx) => (
                        <div key={idx} className="flex justify-between py-1.5 text-[15px]">
                          <span>✓ {addons[idx].name}</span>
                          <span>{addons[idx].price ? fmt(addons[idx].price) : 'Sur demande'}</span>
                        </div>
                      ))}
                    </>
                  )}

                  <div className="border-t border-border my-4" />
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
                  <div className="flex justify-between py-1.5 text-sm text-text-secondary">
                    <span>TPS (5%):</span>
                    <span>{fmt(tps)}</span>
                  </div>
                  <div className="flex justify-between py-1.5 text-sm text-text-secondary">
                    <span>TVQ (9,975%):</span>
                    <span>{fmt(tvq)}</span>
                  </div>
                  <div className="flex justify-between py-4 mt-2 border-t-2 border-navy text-xl font-bold">
                    <span>ESTIMATION TOTALE:</span>
                    <span className="text-cta">{fmt(Math.round(total + tps + tvq))}</span>
                  </div>
                </div>

                <div className="bg-white/80 text-sm text-text-secondary mt-4 py-3 px-4 rounded-xl border border-border">
                  ⓘ Ce prix est une estimation. Le prix final sera confirmé lors de votre soumission personnalisée.
                </div>

                <div className="flex flex-col gap-3 mt-6">
                  <button
                    onClick={() => { setModalOpen(true); setModalSuccess(false); }}
                    className="w-full py-4 bg-cta text-white rounded-xl font-semibold text-lg hover:bg-cta-hover transition-colors shadow-lg shadow-cta/20"
                  >
                    Demander ma soumission &rarr;
                  </button>
                  <button
                    onClick={() => router.push('/reserver')}
                    className="w-full py-4 border-2 border-cta text-cta rounded-xl font-semibold hover:bg-cta/5 transition-colors"
                  >
                    Réserver mon installation &rarr;
                  </button>
                  <button onClick={() => goStep(4)} className="text-cta text-sm font-medium hover:text-cta-hover text-center mt-1">
                    &larr; Modifier ma configuration
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                    onClick={() => { setModalOpen(false); store.reset(); router.push('/'); }}
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
