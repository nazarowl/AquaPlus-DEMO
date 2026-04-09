'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES } from '@/lib/data';
import type { Product } from '@/lib/data';

const CATS = CATEGORIES.filter((c) => c !== 'Tout');

function loadCustomProducts(): Product[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem('aquaplus-custom-products');
  return raw ? JSON.parse(raw) : [];
}

function saveCustomProducts(products: Product[]) {
  localStorage.setItem('aquaplus-custom-products', JSON.stringify(products));
  // Dispatch event so boutique page can react
  window.dispatchEvent(new Event('products-updated'));
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [formId, setFormId] = useState('');
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formCat, setFormCat] = useState(CATS[0]);
  const [formBadge, setFormBadge] = useState('');
  const [formImage, setFormImage] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setProducts(loadCustomProducts());
  }, []);

  function resetForm() {
    setFormId('');
    setFormName('');
    setFormDesc('');
    setFormPrice('');
    setFormCat(CATS[0]);
    setFormBadge('');
    setFormImage('');
    setEditing(null);
  }

  function openNew() {
    resetForm();
    // Auto-generate ID
    const existing = loadCustomProducts();
    setFormId('CUSTOM-' + String(existing.length + 1).padStart(3, '0'));
    setShowForm(true);
  }

  function openEdit(product: Product) {
    setEditing(product);
    setFormId(product.id);
    setFormName(product.name);
    setFormDesc(product.desc);
    setFormPrice(String(product.price));
    setFormCat(product.cat);
    setFormBadge(product.badge || '');
    setFormImage(product.image || '');
    setShowForm(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const product: Product = {
      id: formId,
      name: formName,
      desc: formDesc,
      price: parseFloat(formPrice),
      cat: formCat,
      badge: formBadge || undefined,
      image: formImage || undefined,
    };

    let updated: Product[];
    if (editing) {
      updated = products.map((p) => (p.id === editing.id ? product : p));
    } else {
      updated = [...products, product];
    }

    setProducts(updated);
    saveCustomProducts(updated);
    setShowForm(false);
    resetForm();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleDelete(id: string) {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveCustomProducts(updated);
  }

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Header */}
      <div className="bg-navy">
        <div className="max-w-5xl mx-auto px-6 py-12 text-center">
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Administration</h1>
          <p className="text-white/60 text-sm">Gérer les produits de la boutique</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-6 relative z-10 pb-20">
        {/* Actions bar */}
        <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-5 flex items-center justify-between mb-6">
          <div>
            <span className="text-navy font-semibold">{products.length}</span>
            <span className="text-text-secondary text-sm ml-1">
              produit{products.length !== 1 ? 's' : ''} personnalisé{products.length !== 1 ? 's' : ''}
            </span>
          </div>
          <button
            onClick={openNew}
            className="px-5 py-2.5 bg-cta text-white rounded-lg font-semibold text-sm hover:bg-cta-hover transition-colors flex items-center gap-2"
          >
            <span className="text-lg leading-none">+</span> Ajouter un produit
          </button>
        </div>

        {/* Saved toast */}
        <AnimatePresence>
          {saved && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 bg-success/10 border border-success/30 text-success rounded-lg px-4 py-3 text-sm font-medium text-center"
            >
              ✓ Produit sauvegardé! Visible dans la boutique.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product list */}
        {products.length === 0 && !showForm ? (
          <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-12 text-center">
            <div className="text-5xl mb-4 opacity-30">📦</div>
            <h3 className="text-lg font-semibold text-navy mb-2">Aucun produit personnalisé</h3>
            <p className="text-text-secondary text-sm mb-6">
              Les produits que vous ajoutez ici apparaîtront dans la boutique en plus du catalogue existant.
            </p>
            <button
              onClick={openNew}
              className="px-6 py-3 bg-cta text-white rounded-lg font-semibold hover:bg-cta-hover transition-colors"
            >
              Ajouter mon premier produit
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-[0_1px_6px_rgba(0,0,0,0.06)] p-5 flex items-center gap-4"
              >
                {/* Preview */}
                <div className="w-16 h-16 rounded-lg bg-light-gray flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {product.image ? (
                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl opacity-30">📦</span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-navy text-sm truncate">{product.name}</h4>
                    {product.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold text-white ${product.badge === 'Populaire' ? 'bg-warning' : 'bg-success'}`}>
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-text-secondary text-xs truncate">{product.desc}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-navy font-bold text-sm">{parseFloat(String(product.price)).toFixed(2)} $</span>
                    <span className="text-text-secondary text-xs bg-light-gray px-2 py-0.5 rounded">{product.cat}</span>
                    <span className="text-text-secondary text-[10px]">{product.id}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => openEdit(product)}
                    className="px-3 py-1.5 text-cta text-sm font-medium border border-cta/30 rounded-lg hover:bg-cta/5 transition-colors"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-3 py-1.5 text-error text-sm font-medium border border-error/30 rounded-lg hover:bg-error/5 transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Add/Edit Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-navy/80 flex items-center justify-center p-4"
              onClick={() => { setShowForm(false); resetForm(); }}
            >
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                className="bg-white rounded-2xl max-w-[550px] w-full max-h-[90vh] overflow-y-auto p-8 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => { setShowForm(false); resetForm(); }}
                  className="absolute top-4 right-4 text-text-secondary hover:text-text-dark text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-light-gray"
                >
                  &times;
                </button>

                <h3 className="text-xl font-heading font-bold text-navy mb-1">
                  {editing ? 'Modifier le produit' : 'Nouveau produit'}
                </h3>
                <p className="text-text-secondary text-sm mb-6">
                  {editing ? `ID: ${editing.id}` : 'Remplissez les informations du produit'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-text-secondary mb-1 font-medium">Nom du produit *</label>
                    <input
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="ex: Chlore en granules 15 kg"
                      className="w-full h-12 border border-border rounded-lg px-4 text-sm focus:border-cta focus:ring-2 focus:ring-cta/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-text-secondary mb-1 font-medium">Description *</label>
                    <textarea
                      required
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      placeholder="Courte description du produit"
                      className="w-full h-20 border border-border rounded-lg p-4 text-sm focus:border-cta focus:ring-2 focus:ring-cta/10 transition-all resize-y"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-text-secondary mb-1 font-medium">Prix (CAD) *</label>
                      <input
                        required
                        type="number"
                        step="0.01"
                        min="0"
                        value={formPrice}
                        onChange={(e) => setFormPrice(e.target.value)}
                        placeholder="29.99"
                        className="w-full h-12 border border-border rounded-lg px-4 text-sm focus:border-cta focus:ring-2 focus:ring-cta/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-text-secondary mb-1 font-medium">Catégorie *</label>
                      <select
                        value={formCat}
                        onChange={(e) => setFormCat(e.target.value)}
                        className="w-full h-12 border border-border rounded-lg px-4 text-sm focus:border-cta transition-all"
                      >
                        {CATS.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-text-secondary mb-1 font-medium">Badge (optionnel)</label>
                    <select
                      value={formBadge}
                      onChange={(e) => setFormBadge(e.target.value)}
                      className="w-full h-12 border border-border rounded-lg px-4 text-sm focus:border-cta transition-all"
                    >
                      <option value="">Aucun</option>
                      <option value="Populaire">Populaire</option>
                      <option value="Nouveau">Nouveau</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-text-secondary mb-1 font-medium">URL de l&apos;image (optionnel)</label>
                    <input
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="https://exemple.com/image.jpg ou /products/photo.jpg"
                      className="w-full h-12 border border-border rounded-lg px-4 text-sm focus:border-cta focus:ring-2 focus:ring-cta/10 transition-all"
                    />
                    <p className="text-xs text-text-secondary mt-1">
                      Placez vos images dans <code className="bg-light-gray px-1 rounded">public/products/</code> et utilisez le chemin <code className="bg-light-gray px-1 rounded">/products/nom.jpg</code>
                    </p>
                  </div>

                  {/* Image preview */}
                  {formImage && (
                    <div className="border border-border rounded-lg p-3">
                      <p className="text-xs text-text-secondary mb-2">Aperçu:</p>
                      <div className="h-32 bg-light-gray rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          src={formImage}
                          alt="Aperçu"
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => { setShowForm(false); resetForm(); }}
                      className="flex-1 py-3 border border-border rounded-lg font-medium text-text-secondary hover:bg-light-gray transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-cta text-white rounded-lg font-semibold hover:bg-cta-hover transition-colors"
                    >
                      {editing ? 'Sauvegarder' : 'Ajouter le produit'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
