'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SuccessState from '@/components/SuccessState';

const SERVICES = [
  {
    id: 'ouverture',
    title: 'Ouverture et fermeture',
    subtitle: 'Piscines et spas',
    desc: "Confiez-nous l'ouverture printanière et la fermeture hivernale de votre piscine ou spa. Nos techniciens certifiés s'occupent de tout : retrait ou installation de la couverture, mise en marche de la filtration, traitement chimique initial, vérification complète de l'équipement et hivernisation.",
    includes: [
      'Retrait / installation de la couverture',
      'Mise en route / arrêt du système de filtration',
      'Traitement chimique complet',
      "Inspection visuelle de l'équipement",
      'Nettoyage du bassin et des skimmers',
      'Rapport d\'état post-service',
    ],
    price: 'À partir de 350 $',
    duration: '2 à 3 heures',
    icon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="20" fill="#dbeafe" stroke="#2563eb" stroke-width="1.5"/>
      <path d="M32 16v4M32 44v4M16 32h4M44 32h4" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>
      <path d="M24 22c2 4 6 6 8 6s6-2 8-6" stroke="#2563eb" stroke-width="1.5" fill="none"/>
      <path d="M22 36c4-2 8 2 12-1s8 2 12 0" stroke="#2563eb" stroke-width="1.5" fill="none"/>
      <path d="M28 28l4 4 4-4" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    gradient: 'from-blue-500 to-cyan-500',
    bgLight: 'from-blue-50 to-cyan-50',
  },
  {
    id: 'reparation',
    title: 'Remplacement et réparation',
    subtitle: 'Équipements et composantes',
    desc: "Pompe défectueuse, fuite de tuyauterie, liner endommagé? Notre équipe diagnostique et répare tous les types de problèmes. Nous travaillons avec toutes les marques et avons les pièces en stock pour une intervention rapide.",
    includes: [
      'Diagnostic complet du problème',
      'Réparation de pompes et moteurs',
      'Remplacement de filtres et cartouches',
      'Réparation de fuites et tuyauterie',
      'Remplacement de pièces défectueuses',
      'Garantie sur les pièces et la main-d\'œuvre',
    ],
    price: 'Sur devis',
    duration: 'Variable selon le travail',
    icon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 44l-6 6a3 3 0 004 4l6-6" stroke="#059669" stroke-width="2" fill="#d1fae5"/>
      <path d="M24 40l16-16" stroke="#059669" stroke-width="2" stroke-linecap="round"/>
      <path d="M36 20l4-4a8 8 0 0112 0 8 8 0 010 12l-4 4" stroke="#059669" stroke-width="2" fill="none"/>
      <path d="M40 24l-4-4" stroke="#059669" stroke-width="2" stroke-linecap="round"/>
      <circle cx="44" cy="20" r="2" fill="#059669" opacity="0.3"/>
    </svg>`,
    gradient: 'from-emerald-500 to-teal-500',
    bgLight: 'from-emerald-50 to-teal-50',
  },
  {
    id: 'installation',
    title: "Installation d'équipement",
    subtitle: 'Pompes, chauffe-eau, systèmes au sel',
    desc: "Faites installer vos nouveaux équipements par des professionnels. Thermopompe, système au sel, éclairage LED, pompe de filtration — nous assurons une installation conforme aux normes et optimisée pour la performance.",
    includes: [
      'Installation de thermopompes',
      'Système au sel (chlorinateur)',
      'Éclairage LED et fibre optique',
      'Pompes et systèmes de filtration',
      'Couvertures automatiques',
      'Mise en service et calibration',
    ],
    price: 'À partir de 250 $',
    duration: '1 à 4 heures selon l\'équipement',
    icon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="24" width="32" height="24" rx="4" fill="#fce7f3" stroke="#db2777" stroke-width="1.5"/>
      <path d="M24 24v-8a8 8 0 0116 0v8" stroke="#db2777" stroke-width="1.5"/>
      <circle cx="32" cy="36" r="5" fill="none" stroke="#db2777" stroke-width="1.5"/>
      <path d="M32 33v6" stroke="#db2777" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M30 18h4" stroke="#db2777" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
    gradient: 'from-pink-500 to-rose-500',
    bgLight: 'from-pink-50 to-rose-50',
  },
  {
    id: 'analyse',
    title: "Test et analyse d'eau",
    subtitle: 'Diagnostic et recommandations',
    desc: "Un service d'analyse complet de la qualité de votre eau. Nous testons le pH, le chlore, l'alcalinité, la dureté calcique et les métaux. Vous recevez un rapport détaillé avec des recommandations personnalisées de traitement.",
    includes: [
      'Analyse complète (pH, chlore, alcalinité)',
      'Test de dureté calcique',
      'Détection de métaux (fer, cuivre)',
      'Test de stabilisant (acide cyanurique)',
      'Rapport détaillé avec résultats',
      'Recommandations de traitement personnalisées',
    ],
    price: 'Gratuit en magasin',
    duration: '15 minutes',
    icon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="12" width="12" height="40" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
      <rect x="34" y="18" width="12" height="34" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
      <path d="M24 28v12" stroke="#d97706" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M40 32v8" stroke="#d97706" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="24" cy="24" r="2" fill="#f59e0b" opacity="0.5"/>
      <circle cx="40" cy="28" r="2" fill="#f59e0b" opacity="0.5"/>
      <path d="M22 44h4M38 44h4" stroke="#d97706" stroke-width="1" stroke-linecap="round" opacity="0.5"/>
    </svg>`,
    gradient: 'from-amber-500 to-orange-500',
    bgLight: 'from-amber-50 to-orange-50',
  },
];

export default function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalService, setModalService] = useState<string | null>(null);
  const [modalSuccess, setModalSuccess] = useState(false);

  function openModal(serviceTitle: string) {
    setModalService(serviceTitle);
    setModalSuccess(false);
    setModalOpen(true);
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-navy">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-accent text-sm font-medium border border-white/20 mb-4"
          >
            Services professionnels
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-heading font-bold text-white mb-4"
          >
            Nos services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg max-w-xl mx-auto"
          >
            Une équipe de techniciens certifiés pour l&apos;entretien, la réparation et l&apos;installation de vos équipements de piscine et spa.
          </motion.p>
        </div>
      </div>

      {/* Services list */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10 pb-20">
        <div className="space-y-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-0">
                {/* Left: visual */}
                <div className={`bg-gradient-to-br ${service.bgLight} p-8 flex flex-col items-center justify-center text-center lg:min-h-[320px]`}>
                  <div className="w-20 h-20 mb-4" dangerouslySetInnerHTML={{ __html: service.icon }} />
                  <h3 className="text-xl font-heading font-bold text-navy">{service.title}</h3>
                  <p className="text-text-secondary text-sm mt-1">{service.subtitle}</p>
                  <div className={`mt-4 px-4 py-2 bg-gradient-to-r ${service.gradient} text-white rounded-full text-sm font-semibold`}>
                    {service.price}
                  </div>
                  {service.duration && (
                    <p className="text-text-secondary text-xs mt-2">⏱ {service.duration}</p>
                  )}
                </div>

                {/* Right: details */}
                <div className="p-8">
                  <p className="text-text-dark text-[15px] leading-relaxed mb-6">
                    {service.desc}
                  </p>
                  <h4 className="text-sm uppercase tracking-wider text-text-secondary font-medium mb-3">
                    Ce qui est inclus
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                    {service.includes.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-text-dark">
                        <span className="text-success mt-0.5 flex-shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => openModal(service.title)}
                    className="px-8 py-3 bg-cta text-white rounded-lg font-semibold hover:bg-cta-hover transition-colors"
                  >
                    Demander ce service &rarr;
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-navy rounded-2xl p-10 text-center"
        >
          <h3 className="text-2xl font-heading font-bold text-white mb-3">
            Besoin d&apos;un service sur mesure?
          </h3>
          <p className="text-white/70 mb-6 max-w-lg mx-auto">
            Contactez-nous pour discuter de vos besoins spécifiques. Notre équipe est disponible pour vous conseiller.
          </p>
          <button
            onClick={() => openModal('Service sur mesure')}
            className="px-8 py-4 bg-accent text-navy rounded-lg font-bold text-lg hover:bg-white transition-colors"
          >
            Nous contacter
          </button>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-navy text-white/60 py-10 px-6">
        <div className="max-w-6xl mx-auto text-center text-sm">
          <span className="font-heading text-lg font-bold">
            <span className="text-white">AQUA</span>
            <span className="text-accent">PLUS</span>
          </span>
          <p className="mt-2">&copy; 2026 AquaPlus. Prototype de démonstration.</p>
        </div>
      </footer>

      {/* Service Request Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-navy/80 flex items-center justify-center p-4"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="bg-white rounded-2xl max-w-[550px] w-full max-h-[90vh] overflow-y-auto p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-text-secondary hover:text-text-dark text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-light-gray"
              >
                &times;
              </button>

              {!modalSuccess ? (
                <>
                  <h3 className="text-center text-xl font-heading font-bold text-navy mb-1">
                    Demander un service
                  </h3>
                  <p className="text-center text-text-secondary text-sm mb-6">{modalService}</p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setModalSuccess(true);
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
                      <label className="block text-sm text-text-secondary mb-1 font-medium">Adresse *</label>
                      <input required className="w-full h-12 border border-border rounded-lg px-4 text-sm focus:border-cta focus:ring-2 focus:ring-cta/10 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm text-text-secondary mb-1 font-medium">Type d&apos;installation</label>
                      <select className="w-full h-12 border border-border rounded-lg px-4 text-sm focus:border-cta transition-all">
                        <option>Piscine creusée</option>
                        <option>Piscine hors-terre</option>
                        <option>Spa encastré</option>
                        <option>Spa portable</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-text-secondary mb-1 font-medium">Message</label>
                      <textarea className="w-full h-24 border border-border rounded-lg p-4 text-sm focus:border-cta focus:ring-2 focus:ring-cta/10 transition-all resize-y" placeholder="Décrivez vos besoins..." />
                    </div>
                    <button type="submit" className="w-full py-3.5 bg-cta text-white rounded-lg font-semibold hover:bg-cta-hover transition-colors">
                      Envoyer ma demande &rarr;
                    </button>
                  </form>
                </>
              ) : (
                <SuccessState title="Demande envoyée!">
                  <p className="text-text-secondary mb-6">
                    Notre équipe vous contactera dans les 24h pour planifier votre service.
                  </p>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="px-8 py-3 bg-cta text-white rounded-lg font-semibold hover:bg-cta-hover transition-colors"
                  >
                    Fermer
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
