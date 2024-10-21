import { NeonGlowShadeEnum, NeonThicknessEnum, NeonType } from "./types";

export const neonGlowShade = Object.values(NeonGlowShadeEnum);
export const neonThickness = Object.values(NeonThicknessEnum);

export const defaultNeon: NeonType = {
  title: "Гибкий неон",
  length: 0,
  glowShade: NeonGlowShadeEnum.Warm,
  thickness: NeonThicknessEnum.Small,
  painting: false,
  needles: 0,
  powerUnits: 0,
  contours: 0,
  price: 4214,
  extensions_1m: 0,
};
