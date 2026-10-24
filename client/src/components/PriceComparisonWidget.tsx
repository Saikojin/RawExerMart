import React, { useState, useEffect } from 'react';
import { ExternalLink, CheckCircle2, AlertTriangle, RefreshCw, DollarSign, ShieldAlert, BadgePercent } from 'lucide-react';
import { PriceComparisonSummary, EquipmentItem } from '../types/equipment.js';
import { fetchMarketplaceComparison } from '../services/api.js';
import { formatCurrency, calculatePercentageDiscount } from '../utils/formatters.js';

interface PriceComparisonWidgetProps {
  item: EquipmentItem;
}

export const PriceComparisonWidget: React.FC<PriceComparisonWidgetProps> = ({ item }) => {
  const [comparison, setComparison] = useState<PriceComparisonSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [simulateFailure, setSimulateFailure] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async (shouldFail: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMarketplaceComparison(item.id, shouldFail);
      setComparison(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch comparison');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(simulateFailure);
  }, [item.id, simulateFailure]);

  const handleToggleFailure = () => {
    const nextState = !simulateFailure;
    setSimulateFailure(nextState);
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 shadow-lg">
      {/* Header & Simulator Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
              Story EX-104 Feature
            </span>
            <h3 className="text-base font-bold text-white">External Marketplace Price Comparison</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Aggregated pricing across verified fitness distributors and secondary markets.
          </p>
        </div>

        {/* Story Scenario 2 Simulation Toggle */}
        <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={handleToggleFailure}
            className={`flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-1 rounded transition-colors ${
              simulateFailure
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
            title="Toggle simulated vendor timeout/failure (>2000ms) to verify Scenario 2 graceful fallback"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Simulate Vendor Failure: {simulateFailure ? 'ON (Scenario 2)' : 'OFF'}</span>
          </button>
          <button
            type="button"
            onClick={() => loadData(simulateFailure)}
            className="p-1 text-slate-400 hover:text-white"
            title="Refresh comparison"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="py-8 flex flex-col items-center justify-center space-y-2">
          <RefreshCw className="w-6 h-6 text-orange-500 animate-spin" />
          <span className="text-xs text-slate-400">Querying external vendor marketplaces...</span>
        </div>
      ) : error ? (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs">
          {error}
        </div>
      ) : comparison ? (
        <div className="mt-4 space-y-4">
          {/* Scenario 2: Graceful Fallback Warning Banner */}
          {comparison.isFallback && (
            <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start space-x-3 text-amber-300">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <strong className="font-semibold block">Graceful Fallback Mode Active (Scenario 2)</strong>
                <p className="text-amber-200/90 leading-relaxed">
                  {comparison.fallbackReason ||
                    'External prices currently unavailable - displaying verified RawExerMart listing.'}
                </p>
                <p className="text-[11px] text-amber-400/80">
                  The UI remained fully operational, protecting the buyer experience without layout degradation.
                </p>
              </div>
            </div>
          )}

          {/* Pricing Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Vendor / Marketplace</th>
                  <th className="py-2.5 px-3">Condition</th>
                  <th className="py-2.5 px-3">Listed Price</th>
                  <th className="py-2.5 px-3">Est. Shipping</th>
                  <th className="py-2.5 px-3 text-right">Offer Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {/* RawExerMart Internal Row */}
                <tr className="bg-orange-500/5 hover:bg-orange-500/10 transition-colors">
                  <td className="py-3 px-3 font-semibold text-white flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                    <span>RawExerMart (This Listing)</span>
                  </td>
                  <td className="py-3 px-3 text-slate-300 capitalize">
                    {item.condition.replace(/_/g, ' ')}
                  </td>
                  <td className="py-3 px-3 font-bold text-white text-sm">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="py-3 px-3 text-slate-400">
                    Calculated at Pickup / Freight
                  </td>
                  <td className="py-3 px-3 text-right">
                    {comparison.lowestPrice.isExerMart ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm shadow-emerald-500/10">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Lowest Price</span>
                      </span>
                    ) : (
                      <span className="text-slate-400">Verified Listing</span>
                    )}
                  </td>
                </tr>

                {/* External Vendors Rows */}
                {comparison.externalListings.map((vendor, idx) => {
                  const isLowest =
                    !comparison.lowestPrice.isExerMart &&
                    comparison.lowestPrice.vendor === vendor.marketplaceName;

                  return (
                    <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-3 text-slate-200">
                        <a
                          href={vendor.marketplaceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-orange-400 inline-flex items-center space-x-1 underline decoration-slate-600 underline-offset-2"
                        >
                          <span>{vendor.marketplaceName}</span>
                          <ExternalLink className="w-3 h-3 text-slate-500" />
                        </a>
                      </td>
                      <td className="py-3 px-3 text-slate-400 capitalize">
                        {vendor.condition}
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-200">
                        {formatCurrency(vendor.price)}
                      </td>
                      <td className="py-3 px-3 text-slate-400">
                        {vendor.shippingEstimate === 0 ? 'Free Shipping' : `+${formatCurrency(vendor.shippingEstimate)}`}
                      </td>
                      <td className="py-3 px-3 text-right">
                        {isLowest ? (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Lowest Price</span>
                          </span>
                        ) : (
                          <span className="text-slate-500">
                            +{formatCurrency(vendor.price - item.price)} vs ExerMart
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Savings Metric Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400">Original Retail MSRP</p>
                <p className="text-sm font-bold text-slate-200">{formatCurrency(item.originalMSRP)}</p>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
                <BadgePercent className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400">Depreciation Savings</p>
                <p className="text-sm font-bold text-orange-400">
                  {calculatePercentageDiscount(item.originalMSRP, item.price)}% OFF MSRP
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400">Best Deal Vendor</p>
                <p className="text-sm font-bold text-slate-200 truncate">
                  {comparison.lowestPrice.vendor}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
