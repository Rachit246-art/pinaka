export const currencies = [
  { code: 'INR', name: 'India (INR ₹)', symbol: '₹', rate: 83.0 },
  { code: 'USD', name: 'United States (USD $)', symbol: '$', rate: 1.0 },
  { code: 'EUR', name: 'Europe (EUR €)', symbol: '€', rate: 0.92 },
  { code: 'GBP', name: 'United Kingdom (GBP £)', symbol: '£', rate: 0.79 },
  { code: 'AUD', name: 'Australia (AUD A$)', symbol: 'A$', rate: 1.52 },
  { code: 'AED', name: 'United Arab Emirates (AED 🇦🇪)', symbol: 'Dh ', rate: 3.67 }
];

export const getSelectedCurrency = () => {
  const saved = localStorage.getItem('pigglitz_currency');
  if (saved) {
    const found = currencies.find(c => c.code === saved);
    if (found) return found;
  }
  return currencies[0]; // Default to India (INR)
};

export const setSelectedCurrency = (code) => {
  localStorage.setItem('pigglitz_currency', code);
  window.dispatchEvent(new Event('currency-updated'));
};

export const formatPrice = (usdAmount) => {
  const currency = getSelectedCurrency();
  const converted = (usdAmount * currency.rate).toFixed(2);
  
  // Format nicely (e.g., add commas)
  const formattedValue = parseFloat(converted).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return `${currency.symbol}${formattedValue}`;
};