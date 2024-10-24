import { NeonGlowShadeEnum, NeonThicknessEnum, NeonType } from "./types";

export const neonGlowShade = Object.values(NeonGlowShadeEnum);
export const neonThickness = Object.values(NeonThicknessEnum);

export const defaultNeon: NeonType = {
  title: "Гибкий неон",
  length: 1,
  glowShade: NeonGlowShadeEnum.Warm,
  thickness: NeonThicknessEnum.Small,
  painting: false,
  needles: 1,
  powerUnits: 1,
  contours: 1,
  price: 2200,
  extensions_1m: 0,
  ral: "",
  ral_meters: 1,
  profile_price: 350,
  plugs: 1,
};
