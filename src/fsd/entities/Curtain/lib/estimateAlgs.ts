export function getCurtainScreedsPacks(length: number) {
  let pack = 100
  const screeds = length * 5
  const packsQuantity = Math.ceil(screeds / pack)
  return packsQuantity
}
