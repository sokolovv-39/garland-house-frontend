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
  priceObj: {
    m_8_16: 2200,
    m_14_25: 2800,
    m_8_16_prof: 350,
    m_14_25_prof: 450,
  },
  extensions_1m: 0,
  ral: "",
  no_ral_meters: 1,
  ral_meters: 1,
  plugs: 1,
  isScreeds_200mm: false,
};
