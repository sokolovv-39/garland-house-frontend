export function getNeonLength(length: number) {
  const skein = 50;
  const reserved = length * 0.1;
  const skeinsQuantity = Math.ceil(length + reserved / skein);
  return skeinsQuantity;
}

export function getNeonProfile(length: number) {
  const skein = 2;
  const reserved = length * 0.1;
  const skeinsQuantity = Math.ceil(length + reserved / skein);
  return skeinsQuantity;
}

export function getNeonNeedles(contours: number) {
  return contours;
}

export function getNeonPlugs(contours: number) {
  return contours;
}
