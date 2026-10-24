import { EquipmentItem, PriceComparisonSummary, ExternalMarketplacePrice } from '../models/types.js';

export interface ComparisonCalculationResult {
  lowestPrice: {
    vendor: string;
    price: number;
    isExerMart: boolean;
  };
  highestPrice: number;
  averagePrice: number;
  potentialSavingsVsMSRP: number;
  potentialSavingsVsHighest: number;
}

/**
 * Pure function: calculates price comparison metrics given an equipment item and its external listings
 */
export function calculateComparisonMetrics(
  exerMartPrice: number,
  originalMSRP: number,
  externalListings: ExternalMarketplacePrice[]
): ComparisonCalculationResult {
  const allOffers = [
    { vendor: 'RawExerMart', price: exerMartPrice, isExerMart: true },
    ...externalListings.map(l => ({
      vendor: l.marketplaceName,
      price: l.price,
      isExerMart: false
    }))
  ];

  if (allOffers.length === 0) {
    return {
      lowestPrice: { vendor: 'RawExerMart', price: exerMartPrice, isExerMart: true },
      highestPrice: exerMartPrice,
      averagePrice: exerMartPrice,
      potentialSavingsVsMSRP: Math.max(0, originalMSRP - exerMartPrice),
      potentialSavingsVsHighest: 0
    };
  }

  // Sort ascending by price
  const sortedOffers = [...allOffers].sort((a, b) => a.price - b.price);
  const lowest = sortedOffers[0];
  const highest = sortedOffers[sortedOffers.length - 1];
  const total = allOffers.reduce((sum, offer) => sum + offer.price, 0);
  const averagePrice = Math.round(total / allOffers.length);

  const potentialSavingsVsMSRP = Math.max(0, originalMSRP - lowest.price);
  const potentialSavingsVsHighest = Math.max(0, highest.price - lowest.price);

  return {
    lowestPrice: lowest,
    highestPrice: highest.price,
    averagePrice,
    potentialSavingsVsMSRP,
    potentialSavingsVsHighest
  };
}

/**
 * Service to aggregate marketplace comparisons with resilience and fallback simulation
 */
export class MarketplaceComparisonService {
  /**
   * Fetches price comparison summary for an equipment item.
   * Supports simulated failure / latency exceeding threshold for Story EX-104 Scenario 2.
   */
  public async getComparison(
    item: EquipmentItem,
    options?: { simulateFailure?: boolean; simulatedDelayMs?: number }
  ): Promise<PriceComparisonSummary> {
    // Check if failure is simulated (e.g. testing Scenario 2 from Story Test Plan)
    if (options?.simulateFailure) {
      if (options?.simulatedDelayMs && options.simulatedDelayMs > 0) {
        await new Promise(resolve => setTimeout(resolve, options.simulatedDelayMs));
      }
      return {
        equipmentId: item.id,
        equipmentTitle: item.title,
        exerMartPrice: item.price,
        originalMSRP: item.originalMSRP,
        externalListings: [],
        lowestPrice: {
          vendor: 'RawExerMart',
          price: item.price,
          isExerMart: true
        },
        highestPrice: item.price,
        averagePrice: item.price,
        potentialSavingsVsMSRP: Math.max(0, item.originalMSRP - item.price),
        potentialSavingsVsHighest: 0,
        isFallback: true,
        fallbackReason: 'External prices currently unavailable - displaying verified RawExerMart listing.'
      };
    }

    if (options?.simulatedDelayMs && options.simulatedDelayMs > 0) {
      await new Promise(resolve => setTimeout(resolve, options.simulatedDelayMs));
    }

    const metrics = calculateComparisonMetrics(
      item.price,
      item.originalMSRP,
      item.externalComparisons
    );

    return {
      equipmentId: item.id,
      equipmentTitle: item.title,
      exerMartPrice: item.price,
      originalMSRP: item.originalMSRP,
      externalListings: item.externalComparisons,
      lowestPrice: metrics.lowestPrice,
      highestPrice: metrics.highestPrice,
      averagePrice: metrics.averagePrice,
      potentialSavingsVsMSRP: metrics.potentialSavingsVsMSRP,
      potentialSavingsVsHighest: metrics.potentialSavingsVsHighest,
      isFallback: false
    };
  }
}

export const marketplaceService = new MarketplaceComparisonService();
