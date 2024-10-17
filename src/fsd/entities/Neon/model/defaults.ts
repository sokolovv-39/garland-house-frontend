import {
  NeonBracingEnum,
  NeonExtColorEnum,
  NeonGlowShadeEnum,
  NeonThicknessEnum,
  NeonType,
} from "./types";

export const neonGlowShade = Object.values(NeonGlowShadeEnum);
export const neonThickness = Object.values(NeonThicknessEnum);
export const neonBracing = Object.values(NeonBracingEnum);
export const neonExtColor = Object.values(NeonExtColorEnum);

export const defaultNeon: NeonType = {
  title: "Гибкий неон",
  length: 0,
  glowShade: NeonGlowShadeEnum.Warm,
  thickness: NeonThicknessEnum.Small,
  bracing: NeonBracingEnum.Meters_1,
  painting: false,
  needles: 0,
  powerQuantity: 0,
  contours: 0,
  price: 4214,
  extensions_1m: 0,
  extensions_3m: 0,
  extensions_5m: 0,
  extensions_10m: 0,
  extensionColor: NeonExtColorEnum.Black,
};
