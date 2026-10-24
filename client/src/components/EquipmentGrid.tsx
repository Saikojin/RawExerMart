import React from 'react';
import { EquipmentCard } from './EquipmentCard.js';
import { EquipmentItem } from '../types/equipment.js';
import { PackageOpen, RotateCcw } from 'lucide-react';

interface EquipmentGridProps {
  items: EquipmentItem[];
  loading: boolean;
  onSelectItem: (item: EquipmentItem) => void;
  onResetFilters: () => void;
}

export const EquipmentGrid: React.FC<EquipmentGridProps> = ({
  items,
  loading,
  onSelectItem,
  onResetFilters
}) => {
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-slate-900 rounded-2xl border border-slate-800 p-4 animate-pulse">
              <div className="aspect-[4/3] bg-slate-800 rounded-xl mb-4" />
              <div className="h-4 bg-slate-800 rounded w-1/3 mb-2" />
              <div className="h-6 bg-slate-800 rounded w-3/4 mb-4" />
              <div className="h-4 bg-slate-800 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-16 h-16 bg-slate-900 text-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-800 shadow-xl">
          <PackageOpen className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white">No Equipment Found</h3>
        <p className="mt-2 text-sm text-slate-400 max-w-md mx-auto">
          No gym equipment matches your current search or condition filters. Try adjusting your search query or reset filters.
        </p>
        <button
          onClick={onResetFilters}
          className="mt-6 inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <EquipmentCard key={item.id} item={item} onSelect={onSelectItem} />
        ))}
      </div>
    </div>
  );
};
