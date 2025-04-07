export function formatPHP(amount: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(amount)
}

// Convert other currencies to PHP (if needed)
export const convertToPHP = (amount: number, fromCurrency: string = 'USD'): number => {
  // You can implement actual conversion rates here
  // For now, using a simple conversion (1 USD = 50 PHP approximately)
  const conversionRates: { [key: string]: number } = {
    USD: 50,
    EUR: 55,
    GBP: 64
  };

  return amount * (conversionRates[fromCurrency] || 1);
}; 