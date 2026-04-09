'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Product } from '@/lib/data';
import { fmtDec } from '@/lib/utils';
import { useCartStore, useToastStore } from '@/lib/store';

// Category-specific gradients and SVG icons
const CATEGORY_STYLES: Record<string, { gradient: string; icon: string }> = {
  Chimique: {
    gradient: 'from-blue-50 via-cyan-50 to-teal-50',
    icon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12h16v6l8 26a6 6 0 01-6 8H22a6 6 0 01-6-8l8-26v-6z" stroke="#0e7490" stroke-width="1.5" fill="#cffafe"/>
      <path d="M24 12h16" stroke="#0e7490" stroke-width="2" stroke-linecap="round"/>
      <path d="M22 38c4-3 8 2 12-1s8 3 12 0" stroke="#0e7490" stroke-width="1.5" fill="none"/>
      <circle cx="28" cy="44" r="2" fill="#06b6d4" opacity="0.6"/>
      <circle cx="36" cy="42" r="1.5" fill="#06b6d4" opacity="0.4"/>
    </svg>`,
  },
  Entretien: {
    gradient: 'from-emerald-50 via-green-50 to-lime-50',
    icon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="28" width="36" height="4" rx="2" fill="#d1fae5" stroke="#059669" stroke-width="1.5"/>
      <path d="M32 32v20" stroke="#059669" stroke-width="2" stroke-linecap="round"/>
      <path d="M28 52h8" stroke="#059669" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="32" cy="18" rx="14" ry="10" fill="#d1fae5" stroke="#059669" stroke-width="1.5"/>
      <path d="M22 18c3-2 6 1 10-1s7 2 10 0" stroke="#059669" stroke-width="1" opacity="0.5"/>
    </svg>`,
  },
  Couvertures: {
    gradient: 'from-indigo-50 via-blue-50 to-sky-50',
    icon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="20" width="44" height="28" rx="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
      <path d="M10 32h44" stroke="#3b82f6" stroke-width="1" stroke-dasharray="3 3"/>
      <path d="M14 26c6-4 12 2 18-2s12 4 18 0" stroke="#3b82f6" stroke-width="1.5" fill="none"/>
      <path d="M14 38c6-4 12 2 18-2s12 4 18 0" stroke="#3b82f6" stroke-width="1.5" fill="none" opacity="0.4"/>
      <circle cx="20" cy="24" r="1" fill="#3b82f6"/>
      <circle cx="44" cy="24" r="1" fill="#3b82f6"/>
    </svg>`,
  },
  Filtration: {
    gradient: 'from-slate-50 via-gray-50 to-zinc-100',
    icon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="18" fill="#f1f5f9" stroke="#475569" stroke-width="1.5"/>
      <circle cx="32" cy="32" r="12" fill="none" stroke="#475569" stroke-width="1" stroke-dasharray="2 2"/>
      <circle cx="32" cy="32" r="6" fill="#e2e8f0" stroke="#475569" stroke-width="1.5"/>
      <path d="M32 14v4M32 46v4M14 32h4M46 32h4" stroke="#475569" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M44.7 19.3l-2.8 2.8M22.1 41.9l-2.8 2.8M44.7 44.7l-2.8-2.8M22.1 22.1l-2.8-2.8" stroke="#475569" stroke-width="1" stroke-linecap="round" opacity="0.4"/>
    </svg>`,
  },
  Éclairage: {
    gradient: 'from-amber-50 via-yellow-50 to-orange-50',
    icon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="28" r="14" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
      <circle cx="32" cy="28" r="8" fill="#fde68a" stroke="#f59e0b" stroke-width="1"/>
      <path d="M26 42h12v4a2 2 0 01-2 2H28a2 2 0 01-2-2v-4z" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
      <path d="M28 42v-6M32 42v-8M36 42v-6" stroke="#f59e0b" stroke-width="1" stroke-linecap="round" opacity="0.5"/>
      <path d="M32 10v4M48 28h4M12 28h4M44 16l-3 3M20 16l3 3" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
  },
  Accessoires: {
    gradient: 'from-violet-50 via-purple-50 to-fuchsia-50',
    icon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 14v36" stroke="#7c3aed" stroke-width="2" stroke-linecap="round"/>
      <path d="M20 14c0 0 8 2 8 10s-8 10-8 10" stroke="#7c3aed" stroke-width="1.5" fill="#ede9fe"/>
      <rect x="30" y="28" width="20" height="20" rx="4" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.5"/>
      <circle cx="40" cy="38" r="5" fill="none" stroke="#7c3aed" stroke-width="1.5"/>
      <path d="M38 36l2 2 4-4" stroke="#7c3aed" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
    </svg>`,
  },
  Kits: {
    gradient: 'from-rose-50 via-pink-50 to-red-50',
    icon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="22" width="40" height="28" rx="4" fill="#fce7f3" stroke="#e11d48" stroke-width="1.5"/>
      <path d="M22 22v-6a4 4 0 014-4h12a4 4 0 014 4v6" stroke="#e11d48" stroke-width="1.5"/>
      <path d="M12 30h40" stroke="#e11d48" stroke-width="1" opacity="0.3"/>
      <rect x="28" y="28" width="8" height="8" rx="2" fill="#fda4af" stroke="#e11d48" stroke-width="1"/>
      <path d="M32 30v4M30 32h4" stroke="#e11d48" stroke-width="1" stroke-linecap="round"/>
    </svg>`,
  },
};

// Per-product icon overrides for specific items
const PRODUCT_ICONS: Record<string, string> = {
  E04: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="18" y="16" width="28" height="20" rx="6" fill="#d1fae5" stroke="#059669" stroke-width="1.5"/>
    <circle cx="26" cy="26" r="3" fill="none" stroke="#059669" stroke-width="1.5"/>
    <circle cx="38" cy="26" r="3" fill="none" stroke="#059669" stroke-width="1.5"/>
    <path d="M22 36v8M42 36v8" stroke="#059669" stroke-width="2" stroke-linecap="round"/>
    <path d="M18 44h8M38 44h8" stroke="#059669" stroke-width="2" stroke-linecap="round"/>
    <path d="M28 20h8" stroke="#059669" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,
  F03: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="30" r="16" fill="#f1f5f9" stroke="#475569" stroke-width="1.5"/>
    <circle cx="32" cy="30" r="6" fill="#e2e8f0" stroke="#475569" stroke-width="1.5"/>
    <path d="M32 14v4M32 42v4M16 30h4M44 30h4" stroke="#475569" stroke-width="2" stroke-linecap="round"/>
    <path d="M28 48h8v4H28z" fill="#e2e8f0" stroke="#475569" stroke-width="1.5"/>
  </svg>`,
  A01: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12v40M42 12v40" stroke="#7c3aed" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M22 20h20M22 28h20M22 36h20" stroke="#7c3aed" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="22" cy="12" r="2" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.5"/>
    <circle cx="42" cy="12" r="2" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.5"/>
  </svg>`,
  A05: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="28" y="8" width="8" height="40" rx="4" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.5"/>
    <circle cx="32" cy="14" r="6" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.5"/>
    <path d="M24 48h16" stroke="#7c3aed" stroke-width="2" stroke-linecap="round"/>
    <path d="M32 18v6" stroke="#7c3aed" stroke-width="1" opacity="0.4"/>
    <path d="M36 10l4-2M36 14h4M36 18l4 2" stroke="#7c3aed" stroke-width="1" stroke-linecap="round" opacity="0.3"/>
  </svg>`,
};

function getProductVisual(product: Product) {
  const style = CATEGORY_STYLES[product.cat] || CATEGORY_STYLES.Accessoires;
  const icon = PRODUCT_ICONS[product.id] || style.icon;
  return { gradient: style.gradient, icon };
}

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const showToast = useToastStore((s) => s.show);

  const { gradient, icon } = getProductVisual(product);

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
      {/* Product visual */}
      <div className={`h-[200px] ${product.image ? 'bg-light-gray' : `bg-gradient-to-br ${gradient}`} flex items-center justify-center relative p-6 overflow-hidden`}>
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
        ) : (
          <div
            className="w-24 h-24 transition-transform duration-300 group-hover:scale-110"
            dangerouslySetInnerHTML={{ __html: icon }}
          />
        )}
        {product.badge && (
          <span
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-semibold uppercase text-white ${
              product.badge === 'Populaire' ? 'bg-warning' : 'bg-success'
            }`}
          >
            {product.badge}
          </span>
        )}
        {/* Category label */}
        <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-wider font-medium text-text-secondary/60 bg-white/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
          {product.cat}
        </span>
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
