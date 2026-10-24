export type EquipmentCondition = 
  | 'new'
  | 'used_like_new'
  | 'used_good'
  | 'used_fair'
  | 'refurbished';

export type EquipmentCategory =
  | 'free-weights'
  | 'racks-benches'
  | 'cardio'
  | 'machines'
  | 'accessories';

export type SellerType =
  | 'individual'
  | 'certified_dealer'
  | 'commercial_gym';

export interface ExternalMarketplacePrice {
  marketplaceName: string; // e.g. "Rogue Fitness", "Rep Fitness", "Titan Fitness", "eBay", "Amazon"
  marketplaceUrl: string;
  price: number;
  condition: 'new' | 'used' | 'refurbished';
  inStock: boolean;
  shippingEstimate: number; // 0 for free shipping
  lastChecked: string;
}

export interface EquipmentItem {
  id: string;
  title: string;
  slug: string;
  brand: string;
  category: EquipmentCategory;
  condition: EquipmentCondition;
  conditionNotes?: string;
  price: number;
  originalMSRP: number;
  description: string;
  specifications: Record<string, string>;
  images: string[];
  location: string;
  sellerType: SellerType;
  sellerName: string;
  sellerRating: number;
  sellerReviewCount: number;
  isFeatured: boolean;
  createdAt: string;
  externalComparisons: ExternalMarketplacePrice[];
}

export interface CreateEquipmentDTO {
  title: string;
  brand: string;
  category: EquipmentCategory;
  condition: EquipmentCondition;
  conditionNotes?: string;
  price: number;
  originalMSRP?: number;
  description: string;
  specifications?: Record<string, string>;
  images?: string[];
  location: string;
  sellerType?: SellerType;
  sellerName: string;
}

export interface PriceComparisonSummary {
  equipmentId: string;
  equipmentTitle: string;
  exerMartPrice: number;
  originalMSRP: number;
  externalListings: ExternalMarketplacePrice[];
  lowestPrice: {
    vendor: string;
    price: number;
    isExerMart: boolean;
  };
  highestPrice: number;
  averagePrice: number;
  potentialSavingsVsMSRP: number;
  potentialSavingsVsHighest: number;
  isFallback: boolean;
  fallbackReason?: string;
}
