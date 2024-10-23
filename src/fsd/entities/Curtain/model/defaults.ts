import {
  CurtainBracingEnum,
  CurtainCableEnum,
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

export const curtainDefault: CurtainType = {
  title: "Занавес",
  size: CurtainSizeEnum.s_2_1,
  bracing: CurtainBracingEnum.Rope,
  glowShade: CurtainGlowShadeEnum.Warm,
  glowMode: CurtainGlowModeEnum.Flickering,
  cable: CurtainCableEnum.Black,
  surface: CurtainSurfaceEnum.Wood,
  priceObj: {
    s_2_1: 9614,
    s_2_1dot5: 13046,
    s_2_2: 18359,
    s_2_3: 22198,
    s_2_4: 22198,
    s_2_6: 28160,
    s_2_9: 38742,
  },
  quantity: 1,
};
