import React from 'react';
import { X, CheckCircle2, BookOpen, Layers, ExternalLink } from 'lucide-react';

interface StoryTestPlanDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoryTestPlanDashboard: React.FC<StoryTestPlanDashboardProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-white">Story Test Plan: Story EX-104</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">
                  TEST COVERAGE ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Methodology: Michael Leonard, <em>"Story Test Plan Template: Develop test automation as you go"</em> (Medium, 2023)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6 text-xs text-slate-300">
          {/* Article Reference Box */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-orange-400" />
                <span>Reference Article Context: ExerMart Quality Plan</span>
              </span>
              <a
                href="https://medium.com/@michael.leonard/story-test-plan-template-a4202531e741"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:underline flex items-center space-x-1 text-[11px]"
              >
                <span>Read Original Article</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-slate-400 leading-relaxed">
              In Michael Leonard's framework, teams flesh out technical details, prevent rework, and develop test automation
              as they build user stories during backlog refinement. This project implements the exact <strong>ExerMart</strong> application
              and its signature story: <strong>EX-104: Price Comparison Across External Marketplaces</strong>.
            </p>
          </div>

          {/* User Story Definition */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <h3 className="font-bold text-white uppercase text-[11px] tracking-wider mb-2 text-orange-400">
              User Story Statement (EX-104)
            </h3>
            <blockquote className="border-l-2 border-orange-500 pl-3 font-mono text-[11px] text-slate-200 italic">
              "As a shopper looking for gym & fitness equipment,<br />
              I want to view price comparisons from external marketplaces alongside the ExerMart listing,<br />
              So that I can evaluate competitive rates, find the best deal, and buy or sell with confidence."
            </blockquote>
          </div>

          {/* Given-When-Then Acceptance Criteria */}
          <div className="space-y-3">
            <h3 className="font-bold text-white uppercase text-[11px] tracking-wider text-orange-400">
              Acceptance Criteria (BDD Given-When-Then)
            </h3>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
              <div className="flex items-center space-x-2 text-white font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Scenario 1: Successful Price Comparison Display</span>
              </div>
              <ul className="list-disc list-inside text-slate-400 space-y-1 pl-1 font-mono text-[11px]">
                <li><strong className="text-slate-200">Given</strong> a user opens the equipment detail modal for any listing</li>
                <li><strong className="text-slate-200">And</strong> external marketplace vendors (Rogue, Rep, Titan, eBay) return current pricing</li>
                <li><strong className="text-slate-200">When</strong> the comparison matrix renders</li>
                <li><strong className="text-slate-200">Then</strong> external vendor prices are displayed alongside the ExerMart listing</li>
                <li><strong className="text-slate-200">And</strong> the lowest price offer is visibly badged ("Lowest Price") with savings vs MSRP</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
              <div className="flex items-center space-x-2 text-white font-semibold">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Scenario 2: External Marketplace Timeout / Failure (Graceful Fallback)</span>
              </div>
              <ul className="list-disc list-inside text-slate-400 space-y-1 pl-1 font-mono text-[11px]">
                <li><strong className="text-slate-200">Given</strong> a user opens the equipment detail modal</li>
                <li><strong className="text-slate-200">And</strong> the external marketplace API times out (&gt;2000ms) or returns an outage error</li>
                <li><strong className="text-slate-200">When</strong> the comparison service fails or simulation mode is toggled</li>
                <li><strong className="text-slate-200">Then</strong> the UI gracefully falls back without breaking the page or throwing errors</li>
                <li><strong className="text-slate-200">And</strong> displays the verified internal RawExerMart equipment price</li>
                <li><strong className="text-slate-200">And</strong> renders a non-intrusive warning notice: <em>"External prices currently unavailable - displaying verified RawExerMart listing."</em></li>
              </ul>
            </div>
          </div>

          {/* Test Automation Pyramid Breakdown */}
          <div className="space-y-3">
            <h3 className="font-bold text-white uppercase text-[11px] tracking-wider text-orange-400">
              Three-Tier Test Pyramid Structure
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Unit Tier */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">1. Unit Tests</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                    Vitest
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Verifies isolated calculation functions, price comparisons, condition badge styling, and listing input validation.
                </p>
                <div className="text-[10px] font-mono text-slate-500 pt-1">
                  <code>tests/unit/*.test.ts</code>
                </div>
              </div>

              {/* Integration Tier */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">2. Integration Tests</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-bold">
                    Supertest + Express
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Verifies running API endpoints, in-memory store persistence, Scenario 1 comparison metrics, and Scenario 2 timeout fallback payloads.
                </p>
                <div className="text-[10px] font-mono text-slate-500 pt-1">
                  <code>tests/integration/*.test.ts</code>
                </div>
              </div>

              {/* Journey Tier */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">3. Journey / UI Tests</span>
                  <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 text-[10px] font-bold">
                    Testing Library
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Verifies end-to-end user journeys: browsing new vs used items, inspecting details, comparing prices with lowest highlight, and submitting new listings.
                </p>
                <div className="text-[10px] font-mono text-slate-500 pt-1">
                  <code>tests/journey/*.test.ts</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
