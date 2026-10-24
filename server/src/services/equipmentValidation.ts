import { CreateEquipmentDTO, EquipmentCategory, EquipmentCondition } from '../models/types.js';

export interface ValidationError {
  field: string;
  message: string;
}

const VALID_CATEGORIES: EquipmentCategory[] = [
  'free-weights',
  'racks-benches',
  'cardio',
  'machines',
  'accessories'
];

const VALID_CONDITIONS: EquipmentCondition[] = [
  'new',
  'used_like_new',
  'used_good',
  'used_fair',
  'refurbished'
];

/**
 * Validates a listing submission payload
 */
export function validateCreateEquipment(dto: Partial<CreateEquipmentDTO>): {
  isValid: boolean;
  errors: ValidationError[];
} {
  const errors: ValidationError[] = [];

  if (!dto.title || dto.title.trim().length < 3) {
    errors.push({ field: 'title', message: 'Title is required and must be at least 3 characters.' });
  }

  if (!dto.brand || dto.brand.trim().length === 0) {
    errors.push({ field: 'brand', message: 'Brand name is required.' });
  }

  if (!dto.category || !VALID_CATEGORIES.includes(dto.category as EquipmentCategory)) {
    errors.push({
      field: 'category',
      message: `Category must be one of: ${VALID_CATEGORIES.join(', ')}.`
    });
  }

  if (!dto.condition || !VALID_CONDITIONS.includes(dto.condition as EquipmentCondition)) {
    errors.push({
      field: 'condition',
      message: `Condition must be one of: ${VALID_CONDITIONS.join(', ')}.`
    });
  }

  if (dto.price === undefined || dto.price === null || isNaN(Number(dto.price)) || Number(dto.price) <= 0) {
    errors.push({ field: 'price', message: 'Price must be a valid positive number.' });
  }

  if (dto.originalMSRP !== undefined && dto.originalMSRP !== null) {
    if (isNaN(Number(dto.originalMSRP)) || Number(dto.originalMSRP) < 0) {
      errors.push({ field: 'originalMSRP', message: 'Original MSRP must be non-negative.' });
    }
  }

  if (!dto.description || dto.description.trim().length < 10) {
    errors.push({ field: 'description', message: 'Description must be at least 10 characters.' });
  }

  if (!dto.location || dto.location.trim().length === 0) {
    errors.push({ field: 'location', message: 'Location is required (e.g. City, State).' });
  }

  if (!dto.sellerName || dto.sellerName.trim().length === 0) {
    errors.push({ field: 'sellerName', message: 'Seller or gym contact name is required.' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
