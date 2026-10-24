/**
 * Formats a numeric value into USD currency string ($X,XXX)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Calculates percentage savings between two prices
 */
export function calculatePercentageDiscount(regularPrice: number, discountedPrice: number): number {
  if (regularPrice <= 0 || discountedPrice >= regularPrice) return 0;
  return Math.round(((regularPrice - discountedPrice) / regularPrice) * 100);
}

/**
 * Formats ISO date to readable string
 */
export function formatDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return isoString;
  }
}
