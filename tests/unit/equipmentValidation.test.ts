import { describe, it, expect } from 'vitest';
import { validateCreateEquipment } from '../../server/src/services/equipmentValidation.js';
import { CreateEquipmentDTO } from '../../server/src/models/types.js';

describe('Unit Test: Listing Submission Validation', () => {
  const validDTO: CreateEquipmentDTO = {
    title: 'Rogue Ohio Bar (Stainless Steel)',
    brand: 'Rogue Fitness',
    category: 'free-weights',
    condition: 'used_like_new',
    conditionNotes: 'Immaculate knurl, spin is flawless',
    price: 320,
    originalMSRP: 395,
    description: 'The standard Ohio Bar with 28.5mm shaft and 190,000 PSI steel.',
    location: 'Denver, CO',
    sellerName: 'Marcus Vance'
  };

  it('should validate successfully for a complete, compliant listing', () => {
    const result = validateCreateEquipment(validDTO);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should reject titles shorter than 3 characters', () => {
    const result = validateCreateEquipment({ ...validDTO, title: 'No' });
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'title')).toBe(true);
  });

  it('should reject invalid equipment categories', () => {
    const result = validateCreateEquipment({ ...validDTO, category: 'non_existent_category' as any });
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'category')).toBe(true);
  });

  it('should reject invalid condition types', () => {
    const result = validateCreateEquipment({ ...validDTO, condition: 'broken' as any });
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'condition')).toBe(true);
  });

  it('should reject zero or negative listing prices', () => {
    const zeroResult = validateCreateEquipment({ ...validDTO, price: 0 });
    expect(zeroResult.isValid).toBe(false);
    expect(zeroResult.errors.some(e => e.field === 'price')).toBe(true);

    const negativeResult = validateCreateEquipment({ ...validDTO, price: -50 });
    expect(negativeResult.isValid).toBe(false);
    expect(negativeResult.errors.some(e => e.field === 'price')).toBe(true);
  });

  it('should reject descriptions shorter than 10 characters', () => {
    const result = validateCreateEquipment({ ...validDTO, description: 'Short' });
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'description')).toBe(true);
  });

  it('should reject missing seller or contact name', () => {
    const result = validateCreateEquipment({ ...validDTO, sellerName: '' });
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'sellerName')).toBe(true);
  });
});
