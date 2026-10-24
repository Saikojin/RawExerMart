import { EquipmentItem, CreateEquipmentDTO, EquipmentCategory, EquipmentCondition } from './types.js';
import { initialEquipmentData } from '../data/dummyEquipment.js';

export class EquipmentDataStore {
  private items: EquipmentItem[] = [];

  constructor() {
    this.reset();
  }

  public reset(): void {
    // Deep clone initial seed data
    this.items = JSON.parse(JSON.stringify(initialEquipmentData));
  }

  public getAll(filters?: {
    category?: string;
    condition?: string;
    search?: string;
    featured?: boolean;
    sortBy?: 'price_asc' | 'price_desc' | 'newest';
  }): EquipmentItem[] {
    let result = [...this.items];

    if (filters?.category && filters.category !== 'all') {
      result = result.filter(item => item.category === filters.category);
    }

    if (filters?.condition && filters.condition !== 'all') {
      if (filters.condition === 'new') {
        result = result.filter(item => item.condition === 'new');
      } else if (filters.condition === 'used') {
        result = result.filter(item => item.condition.startsWith('used_') || item.condition === 'refurbished');
      } else {
        result = result.filter(item => item.condition === filters.condition);
      }
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        item =>
          item.title.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q)
      );
    }

    if (filters?.featured !== undefined) {
      result = result.filter(item => item.isFeatured === filters.featured);
    }

    if (filters?.sortBy) {
      if (filters.sortBy === 'price_asc') {
        result.sort((a, b) => a.price - b.price);
      } else if (filters.sortBy === 'price_desc') {
        result.sort((a, b) => b.price - a.price);
      } else if (filters.sortBy === 'newest') {
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
    }

    return result;
  }

  public getById(id: string): EquipmentItem | undefined {
    return this.items.find(item => item.id === id);
  }

  public create(dto: CreateEquipmentDTO): EquipmentItem {
    const id = `eq-${Date.now()}`;
    const slug = dto.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newItem: EquipmentItem = {
      id,
      title: dto.title.trim(),
      slug,
      brand: dto.brand.trim(),
      category: dto.category,
      condition: dto.condition,
      conditionNotes: dto.conditionNotes?.trim() || undefined,
      price: Number(dto.price),
      originalMSRP: dto.originalMSRP ? Number(dto.originalMSRP) : Number(dto.price),
      description: dto.description.trim(),
      specifications: dto.specifications || {},
      images: dto.images && dto.images.length > 0 ? dto.images : [
        'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1000&q=80'
      ],
      location: dto.location.trim(),
      sellerType: dto.sellerType || 'individual',
      sellerName: dto.sellerName.trim(),
      sellerRating: 5.0,
      sellerReviewCount: 1,
      isFeatured: false,
      createdAt: new Date().toISOString(),
      externalComparisons: [
        {
          marketplaceName: 'External Benchmark Search',
          marketplaceUrl: `https://www.google.com/search?q=${encodeURIComponent(dto.brand + ' ' + dto.title)}`,
          price: Math.round(Number(dto.originalMSRP || dto.price) * 1.08),
          condition: dto.condition.startsWith('used') ? 'used' : 'new',
          inStock: true,
          shippingEstimate: 45,
          lastChecked: new Date().toISOString()
        }
      ]
    };

    this.items.unshift(newItem);
    return newItem;
  }
}

export const equipmentStore = new EquipmentDataStore();
