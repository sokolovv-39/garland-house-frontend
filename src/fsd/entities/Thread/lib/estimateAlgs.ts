import { ThreadBracingEnum } from "../model";

export function getThreadLength(length: number) {
  const skein = 10;
  let skeinsQuantity = Math.ceil(length / 10);
  const skeinMeters = skein * skeinsQuantity;
  return { skeinsQuantity, skeinMeters };
}

export function getThreadScreedsPacks(length: number) {
  const pack = 100;
  const screeds = length * 5;
  const packsQuantity = Math.ceil(screeds / pack);
  return packsQuantity;
}
