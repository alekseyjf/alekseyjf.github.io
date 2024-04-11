export const currencyFormatter = (cur: number) =>
  new Intl.NumberFormat("fr-US",{
    style: 'currency',
    currency: 'usd',
    minimumFractionDigits: 0,
    currencyDisplay: 'narrowSymbol'
  }).format(cur);
