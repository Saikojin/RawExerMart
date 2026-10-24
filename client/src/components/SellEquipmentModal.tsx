import React, { useState } from 'react';
import { X, Plus, AlertCircle, CheckCircle2 } from 'lucide-react';
import { CreateEquipmentDTO, EquipmentCategory, EquipmentCondition, SellerType } from '../types/equipment.js';
import { createEquipmentListing } from '../services/api.js';

interface SellEquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onListingCreated: () => void;
}

export const SellEquipmentModal: React.FC<SellEquipmentModalProps> = ({
  isOpen,
  onClose,
  onListingCreated
}) => {
  const [formData, setFormData] = useState<Partial<CreateEquipmentDTO>>({
    title: '',
    brand: '',
    category: 'free-weights',
    condition: 'used_like_new',
    conditionNotes: '',
    price: undefined,
    originalMSRP: undefined,
    description: '',
    location: '',
    sellerName: '',
    sellerType: 'individual',
    images: ['https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1000&q=80']
  });

  const [imageUrl, setImageUrl] = useState<string>(
    'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1000&q=80'
  );
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    const payload: CreateEquipmentDTO = {
      title: formData.title || '',
      brand: formData.brand || '',
      category: (formData.category as EquipmentCategory) || 'free-weights',
      condition: (formData.condition as EquipmentCondition) || 'used_like_new',
      conditionNotes: formData.conditionNotes,
      price: Number(formData.price),
      originalMSRP: formData.originalMSRP ? Number(formData.originalMSRP) : Number(formData.price),
      description: formData.description || '',
      location: formData.location || '',
      sellerName: formData.sellerName || '',
      sellerType: (formData.sellerType as SellerType) || 'individual',
      images: imageUrl ? [imageUrl] : formData.images
    };

    const result = await createEquipmentListing(payload);

    setSubmitting(false);
    if (!result.success && result.errors) {
      const errMap: Record<string, string> = {};
      result.errors.forEach(err => {
        errMap[err.field] = err.message;
      });
      setErrors(errMap);
    } else {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onListingCreated();
        onClose();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 backdrop-blur-md">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">List Your Gym Equipment</h2>
              <p className="text-xs text-slate-400">Post new, pre-owned, or refurbished fitness gear</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6">
          {success ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white">Equipment Listed Successfully!</h3>
              <p className="text-xs text-slate-400">
                Your gear has been added to the RawExerMart catalog and is now tracked across market benchmarks.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              {/* General error message banner */}
              {errors.general && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errors.general}</span>
                </div>
              )}

              {/* Title & Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-semibold text-slate-300">Listing Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Rogue RML-390F Flat Foot Monster Lite Power Rack"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.title && <p className="text-rose-400 text-[11px]">{errors.title}</p>}
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Brand *</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g. Rogue Fitness, Rep, Concept2"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.brand && <p className="text-rose-400 text-[11px]">{errors.brand}</p>}
                </div>
              </div>

              {/* Category & Condition */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Equipment Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as EquipmentCategory })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="free-weights">Free Weights & Dumbbells</option>
                    <option value="racks-benches">Power Racks & Benches</option>
                    <option value="cardio">Cardio & Conditioning</option>
                    <option value="machines">Selectorized & Functional Machines</option>
                    <option value="accessories">Bars, Plates & Accessories</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Item Condition *</label>
                  <select
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value as EquipmentCondition })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="new">Brand New (Unopened / Factory sealed)</option>
                    <option value="used_like_new">Used - Like New (No visible wear)</option>
                    <option value="used_good">Used - Good (Normal gym usage)</option>
                    <option value="used_fair">Used - Fair (Cosmetic marks, mechanically sound)</option>
                    <option value="refurbished">Factory Refurbished (Recertified)</option>
                  </select>
                </div>
              </div>

              {/* Condition Notes */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Condition & Wear Notes (For Used Equipment)</label>
                <input
                  type="text"
                  value={formData.conditionNotes}
                  onChange={(e) => setFormData({ ...formData, conditionNotes: e.target.value })}
                  placeholder="e.g. Stored indoors, zero rust, J-cups included, minor scratch on left upright"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Pricing (Selling Price & Original MSRP) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Your Selling Price ($ USD) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.price ?? ''}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    placeholder="e.g. 620"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-sm"
                  />
                  {errors.price && <p className="text-rose-400 text-[11px]">{errors.price}</p>}
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Original Retail MSRP ($ USD)</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.originalMSRP ?? ''}
                    onChange={(e) => setFormData({ ...formData, originalMSRP: Number(e.target.value) })}
                    placeholder="e.g. 845"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-sm"
                  />
                  <span className="text-[10px] text-slate-500">Used for calculating buyer discount %</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Description & Equipment Specs *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detail the equipment specs, steel gauge, footprint, weight capacity, accessories included..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {errors.description && <p className="text-rose-400 text-[11px]">{errors.description}</p>}
              </div>

              {/* Location & Seller Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Location (City, State) *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Austin, TX"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.location && <p className="text-rose-400 text-[11px]">{errors.location}</p>}
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Seller / Contact Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.sellerName}
                    onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
                    placeholder="e.g. Marcus Vance"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.sellerName && <p className="text-rose-400 text-[11px]">{errors.sellerName}</p>}
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Seller Type</label>
                  <select
                    value={formData.sellerType}
                    onChange={(e) => setFormData({ ...formData, sellerType: e.target.value as SellerType })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="individual">Home Gym Owner (Individual)</option>
                    <option value="commercial_gym">Commercial Gym Liquidation</option>
                    <option value="certified_dealer">Certified Equipment Dealer</option>
                  </select>
                </div>
              </div>

              {/* Image URL preview */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Image Web URL</label>
                <div className="flex space-x-2">
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold shadow-lg shadow-orange-500/20 disabled:opacity-50"
                >
                  {submitting ? 'Publishing Listing...' : 'Publish Equipment Listing'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
