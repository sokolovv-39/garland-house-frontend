import {
  NeonBracingEnum,
  NeonGlowShadeEnum,
  NeonThicknessEnum,
  NeonType,
} from "./types";

export const neonGlowShade = Object.values(NeonGlowShadeEnum);
export const neonThickness = Object.values(NeonThicknessEnum);
export const neonBracing = Object.values(NeonBracingEnum);

export const defaultNeon: NeonType = {
  title: "Гибкий неон",
  length: 0,
  glowShade: NeonGlowShadeEnum.Warm,
  thickness: NeonThicknessEnum.Small,
  bracing: NeonBracingEnum.Meters_1,
  painting: false,
  extensionQuantity: 0,
  needles: 0,
  powerQuantity: 0,
  contours: 0,
};
