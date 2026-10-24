import { describe, it, expect } from 'vitest';
import { calculateComparisonMetrics } from '../../server/src/services/marketplaceComparisonService.js';
import { ExternalMarketplacePrice } from '../../server/src/models/types.js';

describe('Unit Test: Price Comparison Algorithm (Story EX-104)', () => {
  const sampleExternalPrices: ExternalMarketplacePrice[] = [
    {
      marketplaceName: 'Rogue Fitness',
      marketplaceUrl: 'https://roguefitness.com/sample',
      price: 845,
      condition: 'new',
      inStock: true,
      shippingEstimate: 95,
      lastChecked: '2026-10-24T10:00:00Z'
    },
    {
      marketplaceName: 'Rep Fitness',
      marketplaceUrl: 'https://repfitness.com/sample',
      price: 799,
      condition: 'new',
      inStock: true,
      shippingEstimate: 0,
      lastChecked: '2026-10-24T10:00:00Z'
    },
    {
      marketplaceName: 'eBay Pre-Owned',
      marketplaceUrl: 'https://ebay.com/sample',
      price: 690,
      condition: 'used',
      inStock: true,
      shippingEstimate: 120,
      lastChecked: '2026-10-24T10:00:00Z'
    }
  ];

  it('should identify RawExerMart as lowest price when internal price beats all competitors', () => {
    const exerMartPrice = 620;
    const msrp = 845;

    const result = calculateComparisonMetrics(exerMartPrice, msrp, sampleExternalPrices);

    expect(result.lowestPrice.isExerMart).toBe(true);
    expect(result.lowestPrice.vendor).toBe('RawExerMart');
    expect(result.lowestPrice.price).toBe(620);
    expect(result.highestPrice).toBe(845);
    expect(result.potentialSavingsVsMSRP).toBe(225); // 845 - 620
    expect(result.potentialSavingsVsHighest).toBe(225); // 845 - 620
  });

  it('should identify an external vendor as lowest price when competitor offers a lower price', () => {
    const exerMartPrice = 900;
    const msrp = 1000;

    const result = calculateComparisonMetrics(exerMartPrice, msrp, sampleExternalPrices);

    expect(result.lowestPrice.isExerMart).toBe(false);
    expect(result.lowestPrice.vendor).toBe('eBay Pre-Owned');
    expect(result.lowestPrice.price).toBe(690);
    expect(result.highestPrice).toBe(900);
    expect(result.potentialSavingsVsMSRP).toBe(310); // 1000 - 690
    expect(result.potentialSavingsVsHighest).toBe(210); // 900 - 690
  });

  it('should handle zero external listings gracefully', () => {
    const exerMartPrice = 500;
    const msrp = 750;

    const result = calculateComparisonMetrics(exerMartPrice, msrp, []);

    expect(result.lowestPrice.isExerMart).toBe(true);
    expect(result.lowestPrice.vendor).toBe('RawExerMart');
    expect(result.lowestPrice.price).toBe(500);
    expect(result.highestPrice).toBe(500);
    expect(result.averagePrice).toBe(500);
    expect(result.potentialSavingsVsMSRP).toBe(250);
    expect(result.potentialSavingsVsHighest).toBe(0);
  });

  it('should never produce negative savings vs MSRP if price exceeds MSRP', () => {
    const exerMartPrice = 1200;
    const msrp = 1000;

    const result = calculateComparisonMetrics(exerMartPrice, msrp, []);

    expect(result.potentialSavingsVsMSRP).toBe(0);
  });
});
