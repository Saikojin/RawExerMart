import React, { useState } from 'react';
import { X, MapPin, Star, ShieldCheck, CheckCircle2, MessageSquare, ShoppingCart, Truck } from 'lucide-react';
import { EquipmentItem } from '../types/equipment.js';
import { getConditionConfig, getCategoryLabel } from '../utils/conditionHelper.js';
import { formatCurrency, calculatePercentageDiscount } from '../utils/formatters.js';
import { PriceComparisonWidget } from './PriceComparisonWidget.js';

interface EquipmentDetailModalProps {
  item: EquipmentItem | null;
  onClose: () => void;
}

export const EquipmentDetailModal: React.FC<EquipmentDetailModalProps> = ({ item, onClose }) => {
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [purchaseStep, setPurchaseStep] = useState<'idle' | 'contacted' | 'bought'>('idle');

  if (!item) return null;

  const condition = getConditionConfig(item.condition);
  const discountPercent = calculatePercentageDiscount(item.originalMSRP, item.price);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-md px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${condition.bgClass} ${condition.textClass} ${condition.borderClass}`}
            >
              {condition.label}
            </span>
            <span className="text-xs text-slate-400 font-semibold tracking-wide uppercase">
              {item.brand} • {getCategoryLabel(item.category)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 space-y-8">
          {/* Main Visual & Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gallery */}
            <div className="space-y-3">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 relative">
                <img
                  src={item.images[activeImageIdx] || item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {item.images.length > 1 && (
                <div className="flex space-x-2">
                  {item.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIdx === idx ? 'border-orange-500' : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Condition Guarantee Note */}
              <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/80 text-xs space-y-1">
                <div className="flex items-center space-x-1.5 text-slate-200 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Condition Verification</span>
                </div>
                <p className="text-slate-400">{condition.description}.</p>
                {item.conditionNotes && (
                  <p className="text-slate-300 font-medium pt-1 border-t border-slate-800">
                    <span className="text-slate-400 font-normal">Seller Inspection Notes: </span>
                    "{item.conditionNotes}"
                  </p>
                )}
              </div>
            </div>

            {/* Product Details & Actions */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-white leading-snug">
                  {item.title}
                </h2>

                {/* Price Display */}
                <div className="mt-4 flex items-baseline space-x-3">
                  <span className="text-3xl font-extrabold text-white">
                    {formatCurrency(item.price)}
                  </span>
                  {item.originalMSRP > item.price && (
                    <span className="text-sm text-slate-500 line-through">
                      MSRP {formatCurrency(item.originalMSRP)}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      Save {discountPercent}%
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Seller & Location Info */}
                <div className="mt-6 pt-5 border-t border-slate-800 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Seller / Provider:</span>
                    <span className="font-semibold text-white flex items-center space-x-1">
                      <span>{item.sellerName}</span>
                      <span className="text-slate-500 capitalize">({item.sellerType.replace('_', ' ')})</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Reputation Score:</span>
                    <span className="flex items-center space-x-1 text-amber-400 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{item.sellerRating.toFixed(1)} / 5.0</span>
                      <span className="text-slate-500">({item.sellerReviewCount} verified reviews)</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Item Location:</span>
                    <span className="flex items-center space-x-1 text-slate-200">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.location}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Fulfillment Options:</span>
                    <span className="flex items-center space-x-1 text-slate-200">
                      <Truck className="w-3.5 h-3.5 text-slate-400" />
                      <span>Local Dock Pickup or Freight Delivery</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                {purchaseStep === 'idle' ? (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setPurchaseStep('contacted')}
                      className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 text-orange-400" />
                      <span>Inquire / Message</span>
                    </button>
                    <button
                      onClick={() => setPurchaseStep('bought')}
                      className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-lg shadow-orange-500/20 transition-all"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Buy / Reserve Gear</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center space-x-3 text-emerald-400 text-xs">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <div>
                      <p className="font-bold">
                        {purchaseStep === 'contacted' ? 'Inquiry Sent to Seller!' : 'Gear Reserved via RawExerMart!'}
                      </p>
                      <p className="text-emerald-300/80">
                        The seller has received your notification. Secure escrow checkout and freight scheduling are unlocked.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          {item.specifications && Object.keys(item.specifications).length > 0 && (
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Technical Specifications & Dimensions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {Object.entries(item.specifications).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-slate-800/80">
                    <span className="text-slate-400">{key}:</span>
                    <span className="font-semibold text-slate-200">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Embedded Story EX-104 Price Comparison Widget */}
          <PriceComparisonWidget item={item} />
        </div>
      </div>
    </div>
  );
};
