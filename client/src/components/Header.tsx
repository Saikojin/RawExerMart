import React from 'react';
import { Dumbbell, PlusCircle, ClipboardCheck, RotateCcw } from 'lucide-react';

interface HeaderProps {
  onOpenSellModal: () => void;
  onOpenTestPlanModal: () => void;
  onResetData: () => void;
  itemCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSellModal,
  onOpenTestPlanModal,
  onResetData,
  itemCount
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20 text-white">
            <Dumbbell className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight text-white">
                RAW<span className="text-orange-500">EXER</span>MART
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full">
                {itemCount} Listings
              </span>
            </div>
            <p className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block">
              Gym Equipment Marketplace & Price Intelligence
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Story Test Plan Button (Story EX-104) */}
          <button
            onClick={onOpenTestPlanModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            title="View Agile Story Test Plan Template & Coverage (EX-104)"
          >
            <ClipboardCheck className="w-4 h-4 text-orange-400" />
            <span className="hidden md:inline">Story Test Plan</span>
            <span className="px-1.5 py-0.2 text-[10px] bg-orange-500/20 text-orange-300 rounded font-mono">
              EX-104
            </span>
          </button>

          {/* Reset Seed Data */}
          <button
            onClick={onResetData}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
            title="Reset Catalog to Seed Data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Sell Gear CTA */}
          <button
            onClick={onOpenSellModal}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-md shadow-orange-500/20 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List Equipment</span>
          </button>
        </div>
      </div>
    </header>
  );
};
