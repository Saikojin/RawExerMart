import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../server/src/app.js';
import { equipmentStore } from '../../server/src/models/dataStore.js';

describe('Integration Test: Marketplace Price Comparison API (Story EX-104)', () => {
  beforeEach(() => {
    equipmentStore.reset();
  });

  describe('Scenario 1: Successful Price Comparison Display', () => {
    it('should aggregate external vendor prices and identify the lowest offer', async () => {
      // eq-101 is Rogue RML-390F ($620 on ExerMart, $845 on Rogue, $799 on Rep, $690 on eBay)
      const res = await request(app).get('/api/marketplaces/compare/eq-101');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      const data = res.body.data;

      expect(data.equipmentId).toBe('eq-101');
      expect(data.isFallback).toBe(false);
      expect(data.fallbackReason).toBeUndefined();
      expect(data.exerMartPrice).toBe(620);
      expect(data.externalListings.length).toBeGreaterThan(0);

      // Verify that ExerMart is correctly flagged as the lowest price
      expect(data.lowestPrice.isExerMart).toBe(true);
      expect(data.lowestPrice.vendor).toBe('RawExerMart');
      expect(data.lowestPrice.price).toBe(620);

      // Verify savings metrics
      expect(data.potentialSavingsVsMSRP).toBeGreaterThan(0);
      expect(data.highestPrice).toBe(845);
    });

    it('should correctly include vendor URLs and stock availability for all comparisons', async () => {
      const res = await request(app).get('/api/marketplaces/compare/eq-102');
      expect(res.status).toBe(200);
      const listings = res.body.data.externalListings;

      expect(listings.length).toBeGreaterThan(0);
      listings.forEach((listing: any) => {
        expect(listing.marketplaceName).toBeDefined();
        expect(listing.marketplaceUrl).toMatch(/^https?:\/\//);
        expect(typeof listing.price).toBe('number');
        expect(typeof listing.inStock).toBe('boolean');
      });
    });
  });

  describe('Scenario 2: External Marketplace API Timeout / Failure (Graceful Fallback)', () => {
    it('should return graceful fallback payload when simulated failure is triggered', async () => {
      const res = await request(app).get('/api/marketplaces/compare/eq-101?simulateFailure=true');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      const data = res.body.data;

      // Verify fallback indicators
      expect(data.isFallback).toBe(true);
      expect(data.fallbackReason).toBe(
        'External prices currently unavailable - displaying verified RawExerMart listing.'
      );

      // Verify internal pricing remains intact
      expect(data.exerMartPrice).toBe(620);
      expect(data.lowestPrice.vendor).toBe('RawExerMart');
      expect(data.lowestPrice.isExerMart).toBe(true);

      // External listings array is safely empty, preventing UI crashes
      expect(data.externalListings).toEqual([]);
    });

    it('should handle simulated vendor latency without failing', async () => {
      const start = Date.now();
      const res = await request(app).get('/api/marketplaces/compare/eq-101?delay=50');
      const elapsed = Date.now() - start;

      expect(res.status).toBe(200);
      expect(elapsed).toBeGreaterThanOrEqual(40);
    });
  });

  describe('Error Handling', () => {
    it('should return 404 when querying comparison for a non-existent equipment ID', async () => {
      const res = await request(app).get('/api/marketplaces/compare/non-existent-gear');

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('not found');
    });
  });
});
