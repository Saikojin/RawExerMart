import React from 'react';
import { ShieldCheck, TrendingDown, RefreshCw, Sparkles } from 'lucide-react';

interface HeroProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
  onFilterCondition: (condition: string) => void;
  selectedCondition: string;
}

export const Hero: React.FC<HeroProps> = ({
  onSearchChange,
  searchQuery,
  onFilterCondition,
  selectedCondition
}) => {
  return (
    <div className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-12 sm:py-16">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-orange-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real-Time Gym Equipment Price Intelligence</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
          Buy, Sell & Showcase <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
            New & Used Gym Equipment
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
          Compare live prices across Rogue, Rep Fitness, Titan, and secondary marketplaces. 
          Discover certified pre-owned gym packages and home gym upgrades with verified condition grading.
        </p>

        {/* Feature Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-300">
          <div className="flex items-center space-x-2 bg-slate-900/80 px-3.5 py-1.5 rounded-full border border-slate-800">
            <TrendingDown className="w-4 h-4 text-emerald-400" />
            <span>Story EX-104 Price Comparison</span>
          </div>
          <div className="flex items-center space-x-2 bg-slate-900/80 px-3.5 py-1.5 rounded-full border border-slate-800">
            <RefreshCw className="w-4 h-4 text-cyan-400" />
            <span>5 Condition Grades (New to Fair)</span>
          </div>
          <div className="flex items-center space-x-2 bg-slate-900/80 px-3.5 py-1.5 rounded-full border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Verified Commercial Liquidations</span>
          </div>
        </div>

        {/* Quick Search */}
        <div className="mt-8 max-w-xl mx-auto">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search racks, Olympic barbells, calibrated bumpers, Concept2..."
              className="w-full pl-5 pr-12 py-3.5 bg-slate-900/90 border border-slate-700 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-xl backdrop-blur-sm"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-4 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Quick Condition Toggle Pills */}
        <div className="mt-4 flex items-center justify-center space-x-2 text-xs">
          <span className="text-slate-400">Quick Filter:</span>
          <button
            onClick={() => onFilterCondition('all')}
            className={`px-2.5 py-1 rounded-md transition-colors ${selectedCondition === 'all' ? 'bg-orange-500 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            All Inventory
          </button>
          <button
            onClick={() => onFilterCondition('new')}
            className={`px-2.5 py-1 rounded-md transition-colors ${selectedCondition === 'new' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-400 hover:text-emerald-400'}`}
          >
            Brand New
          </button>
          <button
            onClick={() => onFilterCondition('used')}
            className={`px-2.5 py-1 rounded-md transition-colors ${selectedCondition === 'used' ? 'bg-cyan-600 text-white font-semibold' : 'text-slate-400 hover:text-cyan-400'}`}
          >
            Used / Pre-Owned
          </button>
        </div>
      </div>
    </div>
  );
};
