'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PoolModel, ColorOption, AddOn } from './data';
import { POOL_ADDONS, SPA_ADDONS } from './data';

// ============================================================
// CART
// ============================================================

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'qty'>) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, delta: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return { items: state.items.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i)) };
          }
          return { items: [...state.items, { ...item, qty: 1 }] };
        }),
      removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQty: (id, delta) =>
        set((state) => {
          const items = state.items
            .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
            .filter((i) => i.qty > 0);
          return { items };
        }),
      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      totalItems: () => get().items.reduce((s, i) => s + i.qty, 0),
      subtotal: () => get().items.reduce((s, i) => s + i.price * i.qty, 0),
    }),
    { name: 'aquaplus-cart', partialize: (state) => ({ items: state.items }) }
  )
);

// ============================================================
// QUOTE
// ============================================================

export interface QuoteState {
  step: number;
  type: 'pool' | 'spa' | null;
  model: PoolModel | null;
  sizeIdx: number;
  color: ColorOption | null;
  premiumColor: boolean;
  addons: number[];
}

interface QuoteStore extends QuoteState {
  setStep: (step: number) => void;
  setType: (type: 'pool' | 'spa') => void;
  setModel: (model: PoolModel) => void;
  setSizeIdx: (idx: number) => void;
  setColor: (color: ColorOption, premium: boolean) => void;
  toggleAddon: (idx: number) => void;
  reset: () => void;
  getTotal: () => number;
  getAddons: () => AddOn[];
}

const defaultQuote: QuoteState = {
  step: 1,
  type: null,
  model: null,
  sizeIdx: 0,
  color: null,
  premiumColor: false,
  addons: [],
};

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set, get) => ({
      ...defaultQuote,
      setStep: (step) => set({ step }),
      setType: (type) => set({ ...defaultQuote, step: 2, type }),
      setModel: (model) =>
        set({
          step: 3,
          model,
          sizeIdx: 0,
          color: { name: 'Sel de mer', hex: '#F5F0E8', premium: false },
          premiumColor: false,
          addons: [],
        }),
      setSizeIdx: (sizeIdx) => set({ sizeIdx }),
      setColor: (color, premium) => set({ color, premiumColor: premium }),
      toggleAddon: (idx) =>
        set((state) => {
          const addons = state.addons.includes(idx)
            ? state.addons.filter((i) => i !== idx)
            : [...state.addons, idx];
          return { addons };
        }),
      reset: () => set(defaultQuote),
      getTotal: () => {
        const s = get();
        if (!s.model) return 0;
        const base = s.model.sizes[s.sizeIdx].p;
        const premium = s.premiumColor ? (s.type === 'pool' ? 1500 : 800) : 0;
        const addonList = s.type === 'pool' ? POOL_ADDONS : SPA_ADDONS;
        const addonsTotal = s.addons.reduce((sum, i) => sum + (addonList[i]?.price || 0), 0);
        return base + premium + addonsTotal;
      },
      getAddons: () => (get().type === 'pool' ? POOL_ADDONS : SPA_ADDONS),
    }),
    { name: 'aquaplus-quote' }
  )
);

// ============================================================
// TOAST
// ============================================================

interface ToastStore {
  message: string;
  visible: boolean;
  show: (msg: string) => void;
  hide: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  message: '',
  visible: false,
  show: (message) => {
    set({ message, visible: true });
    setTimeout(() => set({ visible: false }), 3000);
  },
  hide: () => set({ visible: false }),
}));
