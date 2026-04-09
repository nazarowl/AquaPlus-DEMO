'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS, CATEGORIES } from '@/lib/data';
import type { Product } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export default function BoutiquePage() {
  const [activeCat, setActiveCat] = useState('Tout');
  const [customProducts, setCustomProducts] = useState<Product[]>([]);

  const loadCustom = useCallback(() => {
    const raw = localStorage.getItem('aquaplus-custom-products');
    setCustomProducts(raw ? JSON.parse(raw) : []);
  }, []);

  useEffect(() => {
    loadCustom();
    window.addEventListener('products-updated', loadCustom);
    return () => window.removeEventListener('products-updated', loadCustom);
  }, [loadCustom]);

  const allProducts = [...PRODUCTS, ...customProducts];
  const filtered = activeCat === 'Tout' ? allProducts : allProducts.filter((p) => p.cat === activeCat);

  return (
    <div className="min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy">
            Boutique AquaPlus
          </h2>
          <p className="text-text-secondary text-lg mt-2">
            Tout pour l&apos;entretien de votre piscine et spa
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex gap-2.5 justify-center flex-wrap mb-8 px-4">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCat(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeCat === cat
                  ? 'bg-cta text-white shadow-md shadow-cta/20'
                  : 'bg-white text-navy border border-border hover:border-accent'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 text-text-secondary">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-20" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="14" y="20" width="36" height="28" rx="4" />
              <path d="M14 28h36" />
              <circle cx="32" cy="38" r="6" />
            </svg>
            <p className="text-base mb-3">Aucun produit trouvé</p>
            <button
              onClick={() => setActiveCat('Tout')}
              className="text-cta font-medium hover:text-cta-hover"
            >
              Voir toutes les catégories
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-navy text-white/60 py-10 px-6 mt-16">
        <div className="max-w-6xl mx-auto text-center text-sm">
          <span className="font-heading text-lg font-bold">
            <span className="text-white">AQUA</span>
            <span className="text-accent">PLUS</span>
          </span>
          <p className="mt-2">&copy; 2026 AquaPlus. Prototype de démonstration.</p>
        </div>
      </footer>
    </div>
  );
}
