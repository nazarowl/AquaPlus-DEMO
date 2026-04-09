'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Product } from '@/lib/data';
import { fmtDec } from '@/lib/utils';
import { useCartStore, useToastStore } from '@/lib/store';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const showToast = useToastStore((s) => s.show);

  function handleAdd() {
    addItem({ id: product.id, name: product.name, price: product.price });
    showToast(`✓ ${product.name} ajouté au panier`);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.12)' }}
      className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] overflow-hidden"
    >
      {/* Image placeholder */}
      <div className="h-[200px] bg-light-gray flex items-center justify-center relative">
        <svg className="w-16 h-16 opacity-20" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="14" y="20" width="36" height="28" rx="4" />
          <path d="M14 28h36" />
          <circle cx="32" cy="38" r="6" />
        </svg>
        {product.badge && (
          <span
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-semibold uppercase text-white ${
              product.badge === 'Populaire' ? 'bg-warning' : 'bg-success'
            }`}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <h4 className="text-[15px] font-bold text-navy mb-1 truncate">{product.name}</h4>
        <p className="text-[13px] text-text-secondary leading-snug line-clamp-2 min-h-[36px]">
          {product.desc}
        </p>
        <div className="text-lg font-bold text-navy mt-2.5 mb-3">{fmtDec(product.price)}</div>
        <motion.button
          onClick={handleAdd}
          whileTap={{ scale: 0.97 }}
          className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${
            added
              ? 'bg-success text-white'
              : 'bg-cta text-white hover:bg-cta-hover'
          }`}
        >
          {added ? '✓ Ajouté' : 'Ajouter au panier'}
        </motion.button>
      </div>
    </motion.div>
  );
}
