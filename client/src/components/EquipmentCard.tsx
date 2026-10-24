import React from 'react';
import { MapPin, Star, Sparkles, TrendingDown, ArrowRight } from 'lucide-react';
import { EquipmentItem } from '../types/equipment.js';
import { getConditionConfig } from '../utils/conditionHelper.js';
import { formatCurrency, calculatePercentageDiscount } from '../utils/formatters.js';

interface EquipmentCardProps {
  item: EquipmentItem;
  onSelect: (item: EquipmentItem) => void;
}

export const EquipmentCard: React.FC<EquipmentCardProps> = ({ item, onSelect }) => {
  const condition = getConditionConfig(item.condition);
  const discountPercent = calculatePercentageDiscount(item.originalMSRP, item.price);

  return (
    <div
      onClick={() => onSelect(item)}
      className="group bg-slate-900/90 rounded-2xl border border-slate-800/80 hover:border-orange-500/50 overflow-hidden shadow-lg hover:shadow-orange-500/10 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Image Container with Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
        <img
          src={item.images[0] || 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80'}
          alt={item.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

        {/* Condition Badge (Top-Left) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md border shadow-md ${condition.bgClass} ${condition.textClass} ${condition.borderClass}`}
          >
            {condition.label}
          </span>
          {item.isFeatured && (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Featured Gear</span>
            </span>
          )}
        </div>

        {/* Savings Tag (Top-Right) */}
        {discountPercent > 0 && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-orange-600 text-white shadow-lg">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>{discountPercent}% OFF</span>
            </span>
          </div>
        )}

        {/* External comparison teaser badge (Bottom-Left) */}
        <div className="absolute bottom-3 left-3 text-[11px] text-slate-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700/60">
          Tracks {item.externalComparisons.length + 1} vendor prices
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-semibold text-orange-400 tracking-wide uppercase text-[11px]">
              {item.brand}
            </span>
            <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 capitalize">
              {item.category.replace('-', ' ')}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-base text-white group-hover:text-orange-400 transition-colors line-clamp-2">
            {item.title}
          </h3>

          {/* Condition Notes summary if used */}
          {item.conditionNotes && (
            <p className="mt-2 text-xs text-slate-400 line-clamp-2 italic">
              "{item.conditionNotes}"
            </p>
          )}
        </div>

        {/* Price & Location Footer */}
        <div className="mt-5 pt-4 border-t border-slate-800/80">
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-xl font-extrabold text-white">
                {formatCurrency(item.price)}
              </span>
              {item.originalMSRP > item.price && (
                <span className="ml-2 text-xs text-slate-500 line-through">
                  MSRP {formatCurrency(item.originalMSRP)}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-1 text-xs text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold">{item.sellerRating.toFixed(1)}</span>
              <span className="text-slate-500">({item.sellerReviewCount})</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center space-x-1 truncate max-w-[180px]">
              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="truncate">{item.location}</span>
            </span>

            <span className="text-orange-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center space-x-0.5">
              <span>Compare</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
