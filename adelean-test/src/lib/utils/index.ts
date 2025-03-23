export const formatPrice = (price: number, locale = "en-US") =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 3,
    maximumFractionDigits: 3,
  }).format(price);
