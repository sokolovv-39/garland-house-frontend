import {
  CurtainBracingEnum,
  CurtainCableEnum,
  CurtainExtColorEnum,
  CurtainGlowModeEnum,
  CurtainGlowShadeEnum,
  CurtainSizeEnum,
  CurtainSurfaceEnum,
  CurtainType,
} from "./types";

export const curtainBracings = Object.values(CurtainBracingEnum);
export const curtainSizes = Object.values(CurtainSizeEnum);
export const curtainGlowShades = Object.values(CurtainGlowShadeEnum);
export const curtainGlowMode = Object.values(CurtainGlowModeEnum);
export const curtainCable = Object.values(CurtainCableEnum);
export const curtainSurfaces = Object.values(CurtainSurfaceEnum);
export const curtainExtColors = Object.values(CurtainExtColorEnum);

export const curtainDefault: CurtainType = {
  title: "Занавес",
  size: CurtainSizeEnum.s_2_1,
  bracing: CurtainBracingEnum.Rope,
  glowShade: CurtainGlowShadeEnum.Warm,
  glowMode: CurtainGlowModeEnum.Flickering,
  cable: CurtainCableEnum.Black,
  teeQuantity: 0,
  surface: CurtainSurfaceEnum.Wood,
  price: 2342,
  extensions_1m: 0,
  extensions_3m: 0,
  extensions_5m: 0,
  extensions_10m: 0,
  extColor: CurtainExtColorEnum.Black,
};
