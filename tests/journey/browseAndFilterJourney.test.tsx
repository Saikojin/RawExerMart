import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EquipmentGrid } from '../../client/src/components/EquipmentGrid.js';
import { EquipmentItem } from '../../client/src/types/equipment.js';

describe('Journey Test: Browse & Filter Equipment Catalog', () => {
  const sampleItems: EquipmentItem[] = [
    {
      id: 'eq-1',
      title: 'Rogue RML-390F Power Rack',
      slug: 'rogue-rml-390f',
      brand: 'Rogue Fitness',
      category: 'racks-benches',
      condition: 'used_like_new',
      price: 620,
      originalMSRP: 845,
      description: 'Heavy duty flat foot rack.',
      specifications: {},
      images: ['https://images.unsplash.com/photo-1540497077202-7c8a3999166f'],
      location: 'Austin, TX',
      sellerType: 'individual',
      sellerName: 'Marcus Vance',
      sellerRating: 4.9,
      sellerReviewCount: 15,
      isFeatured: true,
      createdAt: '2026-10-15T14:20:00Z',
      externalComparisons: []
    },
    {
      id: 'eq-2',
      title: 'Eleiko IWF Training Bar 20kg',
      slug: 'eleiko-iwf-bar',
      brand: 'Eleiko',
      category: 'free-weights',
      condition: 'new',
      price: 760,
      originalMSRP: 840,
      description: 'Brand new Olympic weightlifting barbell.',
      specifications: {},
      images: ['https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2'],
      location: 'Chicago, IL',
      sellerType: 'certified_dealer',
      sellerName: 'Midwest Strength Supply',
      sellerRating: 5.0,
      sellerReviewCount: 42,
      isFeatured: false,
      createdAt: '2026-10-20T16:45:00Z',
      externalComparisons: []
    }
  ];

  it('should render equipment items with condition badges and pricing', () => {
    const handleSelect = vi.fn();
    const handleReset = vi.fn();

    render(
      <EquipmentGrid
        items={sampleItems}
        loading={false}
        onSelectItem={handleSelect}
        onResetFilters={handleReset}
      />
    );

    // Verify titles render
    expect(screen.getByText('Rogue RML-390F Power Rack')).toBeInTheDocument();
    expect(screen.getByText('Eleiko IWF Training Bar 20kg')).toBeInTheDocument();

    // Verify condition badges render
    expect(screen.getByText('Used - Like New')).toBeInTheDocument();
    expect(screen.getByText('Brand New')).toBeInTheDocument();

    // Verify pricing
    expect(screen.getByText('$620')).toBeInTheDocument();
    expect(screen.getByText('$760')).toBeInTheDocument();
  });

  it('should invoke onSelectItem when an equipment card is clicked', () => {
    const handleSelect = vi.fn();
    const handleReset = vi.fn();

    render(
      <EquipmentGrid
        items={sampleItems}
        loading={false}
        onSelectItem={handleSelect}
        onResetFilters={handleReset}
      />
    );

    const firstCard = screen.getByText('Rogue RML-390F Power Rack');
    fireEvent.click(firstCard);

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith(sampleItems[0]);
  });

  it('should display empty state when items list is empty and allow resetting filters', () => {
    const handleSelect = vi.fn();
    const handleReset = vi.fn();

    render(
      <EquipmentGrid
        items={[]}
        loading={false}
        onSelectItem={handleSelect}
        onResetFilters={handleReset}
      />
    );

    expect(screen.getByText('No Equipment Found')).toBeInTheDocument();
    const resetBtn = screen.getByRole('button', { name: /Reset All Filters/i });
    fireEvent.click(resetBtn);

    expect(handleReset).toHaveBeenCalledTimes(1);
  });
});
