export function getFringeLength(length: number) {
  const skeinLength = 5;
  let skeinQuantity = Math.ceil(length / 5);

  if (length < 50) skeinQuantity += 2;
  else if (length < 100) skeinQuantity += 4;
  else if (length < 150) skeinQuantity += 5;
  else if (length < 200) skeinQuantity += 6;
  else {
    const reserved = length * 0.1;
    const reservedSkeinQuantity = Math.ceil(reserved / skeinLength);
    skeinQuantity += reservedSkeinQuantity;
  }

  return skeinQuantity;
}

export function getFringeBracketsPacks(length: number) {
  const brackets = length * 5;
  const pack = 50;
  const quantity = Math.ceil(brackets / pack);
  return quantity;
}
