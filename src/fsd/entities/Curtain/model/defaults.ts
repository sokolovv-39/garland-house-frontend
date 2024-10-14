import {
  CurtainBracingEnum,
  CurtainCableEnum,
  CurtainExtensionMultEnum,
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
export const curtainExtensionMults = Object.values(CurtainExtensionMultEnum);
export const curtainSurfaces = Object.values(CurtainSurfaceEnum);

export const curtainDefault: CurtainType = {
  title: "Занавес",
  size: CurtainSizeEnum.s_2_1,
  bracing: CurtainBracingEnum.Rope,
  glowShade: CurtainGlowShadeEnum.Warm,
  glowMode: CurtainGlowModeEnum.Flickering,
  cable: CurtainCableEnum.Black,
  extensionMult: CurtainExtensionMultEnum.m_1,
  teeQuantity: 0,
  extensionQuantity: 0,
  surface: CurtainSurfaceEnum.Wood,
};
