'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/lib/store';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const pathname = usePathname();
  const toggleCart = useCartStore((s) => s.toggleCart);
  const totalItems = useCartStore((s) => s.totalItems);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: '/soumission', label: 'Soumission' },
    { href: '/boutique', label: 'Boutique' },
    { href: '/services', label: 'Services' },
    { href: '/reserver', label: 'Réserver' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy h-[70px] flex items-center justify-between px-6 shadow-lg shadow-navy/30">
      {/* Logo */}
      <Link href="/" className="flex flex-col leading-tight">
        <span className="font-heading text-2xl font-bold tracking-tight">
          <span className="text-white">AQUA</span>
          <span className="text-accent">PLUS</span>
        </span>
        <span className="text-[10px] text-accent tracking-[3px] uppercase">
          Piscines et Spas
        </span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-[15px] font-medium transition-all duration-300 py-2 border-b-2 ${
              pathname === link.href
                ? 'text-accent border-accent'
                : 'text-white/90 border-transparent hover:text-accent hover:border-accent/50'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Cart + Mobile Toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleCart}
          className="relative text-white p-2 hover:text-accent transition-colors"
          aria-label="Panier"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {totalItems() > 0 && (
            <motion.span
              key={totalItems()}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-cta text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
            >
              {totalItems()}
            </motion.span>
          )}
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2"
          aria-label="Menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-[70px] left-0 right-0 bg-navy border-t border-white/10 md:hidden shadow-xl"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-6 py-4 text-[15px] font-medium border-b border-white/5 transition-colors ${
                  pathname === link.href ? 'text-accent bg-white/5' : 'text-white/90 hover:text-accent hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
