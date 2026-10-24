import React from 'react';
import { Filter, ArrowUpDown } from 'lucide-react';

interface FilterBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedCondition: string;
  onSelectCondition: (condition: string) => void;
  selectedSort: string;
  onSelectSort: (sort: string) => void;
  itemCount: number;
}

const CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: 'All Equipment' },
  { id: 'free-weights', label: 'Free Weights & Barbells' },
  { id: 'racks-benches', label: 'Racks & Benches' },
  { id: 'cardio', label: 'Cardio Machines' },
  { id: 'machines', label: 'Functional & Cable' },
  { id: 'accessories', label: 'Plates & Accessories' },
];

const CONDITIONS: { id: string; label: string }[] = [
  { id: 'all', label: 'All Conditions' },
  { id: 'new', label: 'Brand New' },
  { id: 'used_like_new', label: 'Like New' },
  { id: 'used_good', label: 'Good' },
  { id: 'used_fair', label: 'Fair' },
  { id: 'refurbished', label: 'Refurbished' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedCondition,
  onSelectCondition,
  selectedSort,
  onSelectSort,
  itemCount
}) => {
  return (
    <div className="bg-slate-900/60 border-b border-slate-800/80 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-slate-700/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Right side controls: Condition & Sort */}
        <div className="flex items-center space-x-3 text-xs">
          {/* Condition Dropdown */}
          <div className="flex items-center space-x-1.5 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700/60">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedCondition}
              onChange={(e) => onSelectCondition(e.target.value)}
              className="bg-transparent text-slate-200 text-xs font-medium focus:outline-none cursor-pointer"
            >
              {CONDITIONS.map((cond) => (
                <option key={cond.id} value={cond.id} className="bg-slate-900 text-slate-200">
                  {cond.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-1.5 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700/60">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedSort}
              onChange={(e) => onSelectSort(e.target.value)}
              className="bg-transparent text-slate-200 text-xs font-medium focus:outline-none cursor-pointer"
            >
              <option value="newest" className="bg-slate-900 text-slate-200">Newest Listings</option>
              <option value="price_asc" className="bg-slate-900 text-slate-200">Price: Low to High</option>
              <option value="price_desc" className="bg-slate-900 text-slate-200">Price: High to Low</option>
            </select>
          </div>

          {/* Inventory Count */}
          <span className="text-slate-400 font-medium pl-1">
            <strong className="text-slate-200">{itemCount}</strong> items
          </span>
        </div>
      </div>
    </div>
  );
};
