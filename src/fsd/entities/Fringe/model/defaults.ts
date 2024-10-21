import {
  FringeGlowShadeEnum,
  FringeGlowModeEnum,
  FringeCableEnum,
  FringeBracingEnum,
  FringeType,
  FringeLedEnum,
  FringeSurfaceEnum,
} from "./types";

export const fringeGlowShades = Object.values(FringeGlowShadeEnum);
export const fringeGlowModes = Object.values(FringeGlowModeEnum);
export const fringeCables = Object.values(FringeCableEnum);
export const fringeBracings = Object.values(FringeBracingEnum);
export const fringeLeds = Object.values(FringeLedEnum);
export const fringeSurfaces = Object.values(FringeSurfaceEnum);

export const defaultFringe: FringeType = {
  title: "Бахрома",
  length: 0,
  glowShade: FringeGlowShadeEnum.Warm,
  glowMode: FringeGlowModeEnum.Flickering,
  cable: FringeCableEnum.Black,
  bracing: FringeBracingEnum.Bracket,
  tees: 0,
  powerUnits: 0,
  led: FringeLedEnum.led_100,
  contours: 0,
  surface: FringeSurfaceEnum.Wood,
  price: 5321,
  extensions_1m: 0,
  extensions_3m: 0,
  extensions_5m: 0,
  extensions_10m: 0,
};
