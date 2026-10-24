import { describe, it, expect } from 'vitest';
import { getConditionConfig, getCategoryLabel } from '../../client/src/utils/conditionHelper.js';
import { formatCurrency, calculatePercentageDiscount } from '../../client/src/utils/formatters.js';

describe('Unit Test: Condition Helpers & Formatters', () => {
  it('should return correct badge styling and copy for Brand New equipment', () => {
    const config = getConditionConfig('new');
    expect(config.label).toBe('Brand New');
    expect(config.shortLabel).toBe('New');
    expect(config.textClass).toContain('text-emerald-400');
  });

  it('should return correct badge styling and copy for Used - Like New', () => {
    const config = getConditionConfig('used_like_new');
    expect(config.label).toBe('Used - Like New');
    expect(config.shortLabel).toBe('Like New');
    expect(config.textClass).toContain('text-cyan-400');
  });

  it('should return correct badge styling and copy for Factory Refurbished', () => {
    const config = getConditionConfig('refurbished');
    expect(config.label).toBe('Factory Refurbished');
    expect(config.shortLabel).toBe('Refurbished');
    expect(config.textClass).toContain('text-purple-400');
  });

  it('should map categories to user-friendly display labels', () => {
    expect(getCategoryLabel('free-weights')).toBe('Free Weights & Dumbbells');
    expect(getCategoryLabel('racks-benches')).toBe('Power Racks & Benches');
    expect(getCategoryLabel('cardio')).toBe('Cardio & Conditioning');
    expect(getCategoryLabel('machines')).toBe('Selectorized & Functional Machines');
  });

  it('should format USD currency without decimal cents', () => {
    expect(formatCurrency(620)).toBe('$620');
    expect(formatCurrency(12500)).toBe('$12,500');
  });

  it('should calculate accurate percentage discounts', () => {
    expect(calculatePercentageDiscount(1000, 750)).toBe(25);
    expect(calculatePercentageDiscount(845, 620)).toBe(27);
    expect(calculatePercentageDiscount(500, 500)).toBe(0);
    expect(calculatePercentageDiscount(500, 600)).toBe(0);
  });
});
