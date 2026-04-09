'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HERO_IMAGES, POOL_MODELS, COLLECTION_IMAGES } from '@/lib/data';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.15 } },
};

export default function HomePage() {
  // Pick best showcase photos for featured section
  const featuredModels = ['Topaze', 'Lazuli', 'Opale', 'Saphir', 'Tanza', 'Quartz'];

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGES[0]}
            alt="Piscine AquaPlus"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy/80" />
        </div>

        {/* Water shimmer overlay */}
        <div className="absolute inset-0 water-shimmer opacity-20" />

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-6 max-w-3xl"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-2">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-accent text-sm font-medium border border-white/20">
              Piscines et Spas haut de gamme
            </span>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight"
          >
            Votre oasis,{' '}
            <span className="text-accent">sur mesure</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto"
          >
            Configurez votre piscine, obtenez une estimation instantanée et réservez votre installation en quelques clics.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/soumission"
              className="px-8 py-4 bg-cta text-white rounded-lg font-semibold text-lg hover:bg-cta-hover transition-colors shadow-lg shadow-cta/30"
            >
              Configurer ma piscine &rarr;
            </Link>
            <Link
              href="/boutique"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              Voir la boutique
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </motion.div>
      </section>

      {/* FEATURES STRIP */}
      <section className="bg-navy py-6">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: '🏊', label: '10+ modèles', sub: 'de piscines' },
            { icon: '🎨', label: '6 couleurs', sub: 'exclusives' },
            { icon: '⚡', label: 'Estimation', sub: 'instantanée' },
            { icon: '📅', label: 'Réservation', sub: 'en ligne' },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-white/90"
            >
              <div className="text-2xl mb-1">{f.icon}</div>
              <div className="font-semibold text-sm">{f.label}</div>
              <div className="text-white/50 text-xs">{f.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED POOLS */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-3">
              Nos piscines en vedette
            </h2>
            <p className="text-text-secondary text-lg">
              Découvrez notre collection de piscines creusées haut de gamme
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredModels.map((name, i) => {
              const images = COLLECTION_IMAGES[name];
              const model = POOL_MODELS.find((m) => m.name === name);
              if (!images || images.length === 0 || !model) return null;
              return (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.08)] cursor-pointer"
                >
                  <div className="relative h-[240px] overflow-hidden">
                    <Image
                      src={images[0]}
                      alt={name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-heading font-bold text-xl">{name}</h3>
                      <p className="text-white/80 text-sm">
                        {model.sizes[0].s} · À partir de {model.sizes[0].p.toLocaleString('fr-CA')} $
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/soumission"
              className="inline-block px-8 py-3.5 bg-cta text-white rounded-lg font-semibold hover:bg-cta-hover transition-colors"
            >
              Voir tous les modèles &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGES[1]}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy/80" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-2xl mx-auto text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Prêt à plonger?
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Obtenez votre estimation personnalisée en moins de 5 minutes. Sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/soumission"
              className="px-8 py-4 bg-accent text-navy rounded-lg font-bold text-lg hover:bg-white transition-colors"
            >
              Obtenir ma soumission
            </Link>
            <Link
              href="/boutique"
              className="px-8 py-4 border-2 border-white/30 text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Explorer la boutique
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy text-white/60 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="font-heading text-xl font-bold">
              <span className="text-white">AQUA</span>
              <span className="text-accent">PLUS</span>
            </span>
            <p className="text-sm mt-1">Piscines et Spas · Québec, QC</p>
          </div>
          <div className="flex gap-8 text-sm">
            <Link href="/soumission" className="hover:text-accent transition-colors">Soumission</Link>
            <Link href="/boutique" className="hover:text-accent transition-colors">Boutique</Link>
            <Link href="/reserver" className="hover:text-accent transition-colors">Réserver</Link>
          </div>
          <p className="text-xs">&copy; 2026 AquaPlus. Prototype de démonstration.</p>
        </div>
      </footer>
    </div>
  );
}
