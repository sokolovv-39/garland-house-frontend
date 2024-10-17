import { PVSColorEnum } from "../model";

export function getPVSLength(
  length: number,
  color: PVSColorEnum
): {
  skeinsQuantity: number;
  skeinMeters: number;
} {
  if (color === PVSColorEnum.Black) {
    const skein = 100;
    const skeinsQuantity = Math.ceil(length / skein);
    const skeinMeters = skein * skeinsQuantity;
    return { skeinsQuantity, skeinMeters };
  } else if (color === PVSColorEnum.White) {
    const skein = 50;
    const skeinsQuantity = Math.ceil(length / skein);
    const skeinMeters = skein * skeinsQuantity;
    return { skeinsQuantity, skeinMeters };
  }
  return { skeinsQuantity: 0, skeinMeters: 0 };
}
