import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header.js';
import { Hero } from './components/Hero.js';
import { FilterBar } from './components/FilterBar.js';
import { EquipmentGrid } from './components/EquipmentGrid.js';
import { EquipmentDetailModal } from './components/EquipmentDetailModal.js';
import { SellEquipmentModal } from './components/SellEquipmentModal.js';
import { StoryTestPlanDashboard } from './components/StoryTestPlanDashboard.js';
import { EquipmentItem } from './types/equipment.js';
import { fetchEquipment, resetEquipmentStore } from './services/api.js';

export const App: React.FC = () => {
  const [equipmentList, setEquipmentList] = useState<EquipmentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<string>('newest');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [selectedItem, setSelectedItem] = useState<EquipmentItem | null>(null);
  const [isSellModalOpen, setIsSellModalOpen] = useState<boolean>(false);
  const [isTestPlanModalOpen, setIsTestPlanModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchEquipment({
        category: selectedCategory,
        condition: selectedCondition,
        search: searchQuery,
        sortBy: selectedSort
      });
      setEquipmentList(data);
    } catch (err) {
      console.error('Failed to load equipment:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedCondition, searchQuery, selectedSort]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleResetData = async () => {
    const success = await resetEquipmentStore();
    if (success) {
      showToast('Catalog reset to initial seed inventory!');
      loadData();
    } else {
      showToast('Local state refreshed.');
      loadData();
    }
  };

  const handleListingCreated = () => {
    showToast('Your equipment listing has been published!');
    loadData();
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedCondition('all');
    setSearchQuery('');
    setSelectedSort('newest');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-orange-500 text-white text-xs sm:text-sm font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        onOpenSellModal={() => setIsSellModalOpen(true)}
        onOpenTestPlanModal={() => setIsTestPlanModalOpen(true)}
        onResetData={handleResetData}
        itemCount={equipmentList.length}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onSearchChange={setSearchQuery}
          searchQuery={searchQuery}
          onFilterCondition={setSelectedCondition}
          selectedCondition={selectedCondition}
        />

        {/* Filter Toolbar */}
        <FilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedCondition={selectedCondition}
          onSelectCondition={setSelectedCondition}
          selectedSort={selectedSort}
          onSelectSort={setSelectedSort}
          itemCount={equipmentList.length}
        />

        {/* Equipment Grid */}
        <EquipmentGrid
          items={equipmentList}
          loading={loading}
          onSelectItem={setSelectedItem}
          onResetFilters={handleResetFilters}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 RawExerMart. Commercial & home gym marketplace with real-time price comparisons.</p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsTestPlanModalOpen(true)}
              className="hover:text-orange-400 transition-colors underline underline-offset-4"
            >
              Story Test Plan (EX-104)
            </button>
            <a
              href="https://github.com/Saikojin/RawExerMart"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors underline underline-offset-4"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </footer>

      {/* Equipment Showcase Detail Modal */}
      <EquipmentDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      {/* Sell Equipment Modal */}
      <SellEquipmentModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
        onListingCreated={handleListingCreated}
      />

      {/* Story Test Plan Quality Dashboard Modal */}
      <StoryTestPlanDashboard
        isOpen={isTestPlanModalOpen}
        onClose={() => setIsTestPlanModalOpen(false)}
      />
    </div>
  );
};

export default App;
