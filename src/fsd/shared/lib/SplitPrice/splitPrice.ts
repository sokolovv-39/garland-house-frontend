export function splitPrice(price: number) {
  let priceStr = price.toString();
  let i = priceStr.length - 1 - 3;
  while (i >= 0) {
    priceStr = priceStr.slice(0, i + 1) + " " + priceStr.slice(i + 1);
    i -= 3;
  }
  priceStr = priceStr + " ₽";
  return priceStr;
}
