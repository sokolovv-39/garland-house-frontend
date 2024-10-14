export function getRopeLength(length: number, contours: number) {
  let reserved = 1.1 * length;
  return reserved;
}

export function getRopeRings(length: number, contours: number) {
  let ringsQuantity = length + contours;
  return ringsQuantity;
}

export function getRopeLanyards(contours: number) {
  return contours;
}

export function getRopeDuplexClamps(contours: number) {
  let duplexClamps = contours * 2;
  return duplexClamps;
}
