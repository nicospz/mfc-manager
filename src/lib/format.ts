const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "JPY",
});

export const formatPrice = (price: number | string) => {
  const priceNumber = typeof price === "string" ? parseInt(price) : price;
  return priceFormatter.format(priceNumber);
};
