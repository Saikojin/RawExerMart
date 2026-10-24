import { EquipmentCondition, EquipmentCategory } from '../types/equipment.js';

export interface ConditionBadgeConfig {
  label: string;
  shortLabel: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  description: string;
}

export function getConditionConfig(condition: EquipmentCondition): ConditionBadgeConfig {
  switch (condition) {
    case 'new':
      return {
        label: 'Brand New',
        shortLabel: 'New',
        bgClass: 'bg-emerald-500/10',
        textClass: 'text-emerald-400',
        borderClass: 'border-emerald-500/30',
        description: 'Direct from manufacturer or unopened original packaging'
      };
    case 'used_like_new':
      return {
        label: 'Used - Like New',
        shortLabel: 'Like New',
        bgClass: 'bg-cyan-500/10',
        textClass: 'text-cyan-400',
        borderClass: 'border-cyan-500/30',
        description: 'Immaculate condition with no functional or noticeable cosmetic wear'
      };
    case 'used_good':
      return {
        label: 'Used - Good',
        shortLabel: 'Good',
        bgClass: 'bg-blue-500/10',
        textClass: 'text-blue-400',
        borderClass: 'border-blue-500/30',
        description: 'Normal cosmetic signs of gym usage; fully functional mechanisms'
      };
    case 'used_fair':
      return {
        label: 'Used - Fair',
        shortLabel: 'Fair',
        bgClass: 'bg-amber-500/10',
        textClass: 'text-amber-400',
        borderClass: 'border-amber-500/30',
        description: 'Noticeable cosmetic wear, scratches, or minor blemishes; mechanically sound'
      };
    case 'refurbished':
      return {
        label: 'Factory Refurbished',
        shortLabel: 'Refurbished',
        bgClass: 'bg-purple-500/10',
        textClass: 'text-purple-400',
        borderClass: 'border-purple-500/30',
        description: 'Professionally inspected, cleaned, recertified, with fresh wearable parts'
      };
    default:
      return {
        label: 'Condition Unknown',
        shortLabel: 'Used',
        bgClass: 'bg-slate-500/10',
        textClass: 'text-slate-400',
        borderClass: 'border-slate-500/30',
        description: 'Unspecified condition'
      };
  }
}

export function getCategoryLabel(category: EquipmentCategory): string {
  switch (category) {
    case 'free-weights':
      return 'Free Weights & Dumbbells';
    case 'racks-benches':
      return 'Power Racks & Benches';
    case 'cardio':
      return 'Cardio & Conditioning';
    case 'machines':
      return 'Selectorized & Functional Machines';
    case 'accessories':
      return 'Bars, Plates & Accessories';
    default:
      return category;
  }
}
