'use client';

import { useCartStore, useToastStore } from '@/lib/store';
import { fmtDec, calcTPS, calcTVQ } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function CartSidebar() {
  const { items, isOpen, closeCart, updateQty, removeItem } = useCartStore();
  const router = useRouter();

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const tps = calcTPS(subtotal);
  const tvq = calcTVQ(subtotal);
  const total = subtotal + tps + tvq;
  const itemCount = items.reduce((s, i) => s + i.qty, 0);

  function handleCheckout() {
    closeCart();
    router.push('/checkout');
  }

  function handleContinue() {
    closeCart();
  }

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={closeCart}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed top-0 right-0 bottom-0 w-[400px] max-w-[90vw] bg-white z-[70] flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h3 className="font-heading text-lg font-bold text-navy">
            VOTRE PANIER ({itemCount})
          </h3>
          <button
            onClick={closeCart}
            className="text-text-secondary hover:text-text-dark text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-light-gray transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="text-center py-16 text-text-secondary">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-30" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 20h24l-3 16H23z" />
                <circle cx="26" cy="42" r="3" />
                <circle cx="38" cy="42" r="3" />
                <path d="M16 14h4l2 6" />
              </svg>
              <p className="text-base mb-3">Votre panier est vide</p>
              <button
                onClick={() => { closeCart(); router.push('/boutique'); }}
                className="text-cta font-medium hover:text-cta-hover transition-colors"
              >
                Parcourir la boutique &rarr;
              </button>
            </div>
          ) : (
            <div className="space-y-0 divide-y divide-border">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 py-4">
                  <div className="w-14 h-14 bg-light-gray rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 opacity-30" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="14" y="20" width="36" height="28" rx="4" />
                      <path d="M14 28h36" />
                      <circle cx="32" cy="38" r="6" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-navy truncate">{item.name}</h4>
                    <div className="flex items-center gap-2 my-1.5">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-7 h-7 rounded-full bg-light-gray text-navy flex items-center justify-center text-sm font-bold hover:bg-border transition-colors"
                      >
                        −
                      </button>
                      <span className="text-sm font-semibold min-w-[20px] text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-7 h-7 rounded-full bg-light-gray text-navy flex items-center justify-center text-sm font-bold hover:bg-border transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-sm font-semibold text-navy">{fmtDec(item.price * item.qty)}</div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-error text-xs font-medium mt-1 hover:underline"
                    >
                      Retirer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-border bg-light-gray">
            <div className="flex justify-between text-sm py-1">
              <span>Sous-total:</span>
              <span>{fmtDec(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm py-1">
              <span>TPS (5%):</span>
              <span>{fmtDec(tps)}</span>
            </div>
            <div className="flex justify-between text-sm py-1">
              <span>TVQ (9,975%):</span>
              <span>{fmtDec(tvq)}</span>
            </div>
            <div className="flex justify-between text-base font-bold py-3 mt-2 border-t border-border">
              <span>TOTAL:</span>
              <span>{fmtDec(total)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3.5 bg-cta text-white rounded-lg font-semibold text-[15px] hover:bg-cta-hover transition-colors mt-2"
            >
              Passer à la caisse &rarr;
            </button>
            <button
              onClick={handleContinue}
              className="block w-full text-center text-cta text-sm mt-3 hover:text-cta-hover transition-colors"
            >
              Continuer mes achats
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}
