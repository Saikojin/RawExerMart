import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../server/src/app.js';
import { equipmentStore } from '../../server/src/models/dataStore.js';

describe('Integration Test: /api/equipment Endpoints', () => {
  beforeEach(() => {
    // Reset data store before each test to guarantee determinism
    equipmentStore.reset();
  });

  it('GET /api/health - should report healthy status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  it('GET /api/equipment - should return all seeded items', async () => {
    const res = await request(app).get('/api/equipment');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(10);
  });

  it('GET /api/equipment?condition=new - should filter to only brand new items', async () => {
    const res = await request(app).get('/api/equipment?condition=new');
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
    res.body.data.forEach((item: any) => {
      expect(item.condition).toBe('new');
    });
  });

  it('GET /api/equipment?condition=used - should filter to used or refurbished items', async () => {
    const res = await request(app).get('/api/equipment?condition=used');
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
    res.body.data.forEach((item: any) => {
      expect(item.condition.startsWith('used_') || item.condition === 'refurbished').toBe(true);
    });
  });

  it('GET /api/equipment?category=cardio - should filter by cardio category', async () => {
    const res = await request(app).get('/api/equipment?category=cardio');
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
    res.body.data.forEach((item: any) => {
      expect(item.category).toBe('cardio');
    });
  });

  it('GET /api/equipment?search=concept2 - should perform keyword search matching title or brand', async () => {
    const res = await request(app).get('/api/equipment?search=concept2');
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data[0].title.toLowerCase()).toContain('concept2');
  });

  it('GET /api/equipment/:id - should return single item detail', async () => {
    const res = await request(app).get('/api/equipment/eq-101');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe('eq-101');
    expect(res.body.data.brand).toBe('Rogue Fitness');
    expect(res.body.data.specifications).toBeDefined();
  });

  it('GET /api/equipment/invalid-id - should return 404 for unknown item', async () => {
    const res = await request(app).get('/api/equipment/invalid-id');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('POST /api/equipment - should create a new listing with 201 Created', async () => {
    const newListing = {
      title: 'Kabuki Strength Trap Bar HD',
      brand: 'Kabuki Strength',
      category: 'free-weights',
      condition: 'used_like_new',
      conditionNotes: 'Used for deadlifts only, built like a tank',
      price: 650,
      originalMSRP: 849,
      description: 'Open-ended trap bar with swappable grips and built-in bar jack.',
      location: 'Portland, OR',
      sellerName: 'Chris Duffin Gym'
    };

    const res = await request(app)
      .post('/api/equipment')
      .send(newListing);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.title).toBe(newListing.title);

    // Verify it is now retrievable in the catalog
    const fetchRes = await request(app).get(`/api/equipment/${res.body.data.id}`);
    expect(fetchRes.status).toBe(200);
    expect(fetchRes.body.data.title).toBe(newListing.title);
  });

  it('POST /api/equipment - should reject invalid payloads with 400 Bad Request', async () => {
    const invalidListing = {
      title: 'X', // too short
      price: -100 // invalid
    };

    const res = await request(app)
      .post('/api/equipment')
      .send(invalidListing);

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors.length).toBeGreaterThan(0);
  });
});
