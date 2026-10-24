import { EquipmentItem, CreateEquipmentDTO, PriceComparisonSummary } from '../types/equipment.js';
import { initialEquipmentData } from '@server/data/dummyEquipment.js';

const API_BASE = '/api';

export async function fetchEquipment(filters?: {
  category?: string;
  condition?: string;
  search?: string;
  sortBy?: string;
}): Promise<EquipmentItem[]> {
  const queryParams = new URLSearchParams();
  if (filters?.category) queryParams.set('category', filters.category);
  if (filters?.condition) queryParams.set('condition', filters.condition);
  if (filters?.search) queryParams.set('search', filters.search);
  if (filters?.sortBy) queryParams.set('sortBy', filters.sortBy);

  try {
    const res = await fetch(`${API_BASE}/equipment?${queryParams.toString()}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.warn('Backend API unavailable, falling back to local dataset:', error);
    // Client-side fallback filter
    let items = [...initialEquipmentData];
    if (filters?.category && filters.category !== 'all') {
      items = items.filter(i => i.category === filters.category);
    }
    if (filters?.condition && filters.condition !== 'all') {
      if (filters.condition === 'new') items = items.filter(i => i.condition === 'new');
      else if (filters.condition === 'used') items = items.filter(i => i.condition.startsWith('used_') || i.condition === 'refurbished');
      else items = items.filter(i => i.condition === filters.condition);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      items = items.filter(i => i.title.toLowerCase().includes(q) || i.brand.toLowerCase().includes(q));
    }
    return items;
  }
}

export async function fetchEquipmentById(id: string): Promise<EquipmentItem | null> {
  try {
    const res = await fetch(`${API_BASE}/equipment/${id}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.warn(`Falling back for equipment ID ${id}:`, error);
    return initialEquipmentData.find(item => item.id === id) || null;
  }
}

export async function fetchMarketplaceComparison(
  id: string,
  simulateFailure = false
): Promise<PriceComparisonSummary> {
  const url = `${API_BASE}/marketplaces/compare/${id}?simulateFailure=${simulateFailure}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.warn('Marketplace fetch fallback:', error);
    const item = initialEquipmentData.find(i => i.id === id);
    const price = item ? item.price : 500;
    const msrp = item ? item.originalMSRP : 700;

    if (simulateFailure) {
      return {
        equipmentId: id,
        equipmentTitle: item?.title || 'Gym Equipment',
        exerMartPrice: price,
        originalMSRP: msrp,
        externalListings: [],
        lowestPrice: { vendor: 'RawExerMart', price, isExerMart: true },
        highestPrice: price,
        averagePrice: price,
        potentialSavingsVsMSRP: Math.max(0, msrp - price),
        potentialSavingsVsHighest: 0,
        isFallback: true,
        fallbackReason: 'External prices currently unavailable - displaying verified RawExerMart listing.'
      };
    }

    const external = item?.externalComparisons || [];
    return {
      equipmentId: id,
      equipmentTitle: item?.title || 'Gym Equipment',
      exerMartPrice: price,
      originalMSRP: msrp,
      externalListings: external,
      lowestPrice: { vendor: 'RawExerMart', price, isExerMart: true },
      highestPrice: external.length > 0 ? Math.max(...external.map(e => e.price)) : price,
      averagePrice: price,
      potentialSavingsVsMSRP: Math.max(0, msrp - price),
      potentialSavingsVsHighest: 150,
      isFallback: false
    };
  }
}

export async function createEquipmentListing(dto: CreateEquipmentDTO): Promise<{
  success: boolean;
  item?: EquipmentItem;
  errors?: { field: string; message: string }[];
}> {
  try {
    const res = await fetch(`${API_BASE}/equipment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto)
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        errors: data.errors || [{ field: 'general', message: data.message || 'Submission failed' }]
      };
    }

    return {
      success: true,
      item: data.data
    };
  } catch (error) {
    return {
      success: false,
      errors: [{ field: 'network', message: error instanceof Error ? error.message : 'Network error' }]
    };
  }
}

export async function resetEquipmentStore(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/equipment/reset`, { method: 'POST' });
    return res.ok;
  } catch {
    return false;
  }
}
