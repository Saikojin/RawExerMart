import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PriceComparisonWidget } from '../../client/src/components/PriceComparisonWidget.js';
import { EquipmentItem } from '../../client/src/types/equipment.js';
import * as api from '../../client/src/services/api.js';

describe('Journey Test: Story EX-104 Price Comparison Widget Interaction', () => {
  const mockItem: EquipmentItem = {
    id: 'eq-101',
    title: 'Rogue RML-390F Flat Foot Monster Lite Power Rack',
    slug: 'rogue-rml-390f-flat-foot-power-rack',
    brand: 'Rogue Fitness',
    category: 'racks-benches',
    condition: 'used_like_new',
    price: 620,
    originalMSRP: 845,
    description: '3x3 11-gauge steel flat-foot rack.',
    specifications: { 'Steel Gauge': '11-Gauge' },
    images: ['https://images.unsplash.com/photo-1540497077202-7c8a3999166f'],
    location: 'Austin, TX',
    sellerType: 'individual',
    sellerName: 'Marcus Vance',
    sellerRating: 4.95,
    sellerReviewCount: 28,
    isFeatured: true,
    createdAt: '2026-10-15T14:20:00Z',
    externalComparisons: [
      {
        marketplaceName: 'Rogue Fitness (Official)',
        marketplaceUrl: 'https://roguefitness.com',
        price: 845,
        condition: 'new',
        inStock: true,
        shippingEstimate: 95,
        lastChecked: '2026-10-24T10:00:00Z'
      },
      {
        marketplaceName: 'eBay Secondary Market',
        marketplaceUrl: 'https://ebay.com',
        price: 690,
        condition: 'used',
        inStock: true,
        shippingEstimate: 120,
        lastChecked: '2026-10-24T10:00:00Z'
      }
    ]
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('Scenario 1: should render external prices and highlight lowest price offer', async () => {
    vi.spyOn(api, 'fetchMarketplaceComparison').mockResolvedValue({
      equipmentId: 'eq-101',
      equipmentTitle: mockItem.title,
      exerMartPrice: 620,
      originalMSRP: 845,
      externalListings: mockItem.externalComparisons,
      lowestPrice: { vendor: 'RawExerMart', price: 620, isExerMart: true },
      highestPrice: 845,
      averagePrice: 718,
      potentialSavingsVsMSRP: 225,
      potentialSavingsVsHighest: 225,
      isFallback: false
    });

    render(<PriceComparisonWidget item={mockItem} />);

    // Check loading indicator first or wait for table
    expect(await screen.findByText('External Marketplace Price Comparison')).toBeInTheDocument();

    // Verify vendors are present
    expect(await screen.findByText(/Rogue Fitness \(Official\)/i)).toBeInTheDocument();
    expect(screen.getByText(/eBay Secondary Market/i)).toBeInTheDocument();

    // Verify lowest price highlight badge exists
    const lowestBadges = screen.getAllByText(/Lowest Price/i);
    expect(lowestBadges.length).toBeGreaterThanOrEqual(1);

    // Verify savings metric
    expect(screen.getByText(/Depreciation Savings/i)).toBeInTheDocument();
  });

  it('Scenario 2: should display graceful fallback alert banner when vendor failure occurs', async () => {
    // When simulateFailure is triggered, the service returns isFallback: true
    vi.spyOn(api, 'fetchMarketplaceComparison').mockImplementation(async (_id, shouldFail) => {
      if (shouldFail) {
        return {
          equipmentId: 'eq-101',
          equipmentTitle: mockItem.title,
          exerMartPrice: 620,
          originalMSRP: 845,
          externalListings: [],
          lowestPrice: { vendor: 'RawExerMart', price: 620, isExerMart: true },
          highestPrice: 620,
          averagePrice: 620,
          potentialSavingsVsMSRP: 225,
          potentialSavingsVsHighest: 0,
          isFallback: true,
          fallbackReason: 'External prices currently unavailable - displaying verified RawExerMart listing.'
        };
      }
      return {
        equipmentId: 'eq-101',
        equipmentTitle: mockItem.title,
        exerMartPrice: 620,
        originalMSRP: 845,
        externalListings: mockItem.externalComparisons,
        lowestPrice: { vendor: 'RawExerMart', price: 620, isExerMart: true },
        highestPrice: 845,
        averagePrice: 718,
        potentialSavingsVsMSRP: 225,
        potentialSavingsVsHighest: 225,
        isFallback: false
      };
    });

    render(<PriceComparisonWidget item={mockItem} />);

    // Wait for initial render
    expect(await screen.findByText('External Marketplace Price Comparison')).toBeInTheDocument();

    // Click the "Simulate Vendor Failure" button
    const toggleButton = screen.getByTitle(/verify Scenario 2 graceful fallback/i);
    fireEvent.click(toggleButton);

    // Assert that the graceful fallback alert appears
    await waitFor(() => {
      expect(
        screen.getByText(/External prices currently unavailable - displaying verified RawExerMart listing./i)
      ).toBeInTheDocument();
    });

    // Verify that the internal ExerMart price is still safely displayed
    expect(screen.getByText(/\$620/)).toBeInTheDocument();
  });
});
