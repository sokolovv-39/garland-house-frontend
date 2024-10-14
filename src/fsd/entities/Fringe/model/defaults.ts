import {
  FringeGlowShadeEnum,
  FringeGlowModeEnum,
  FringeCableEnum,
  FringeBracingEnum,
  FringeType,
  FringeExtensionMultEnum,
  FringeTeeColourEnum,
  FringeLedEnum,
  FringeSurfaceEnum,
  FringeExtensionColorEnum,
} from "./types";

export const fringeGlowShades = Object.values(FringeGlowShadeEnum);
export const fringeGlowModes = Object.values(FringeGlowModeEnum);
export const fringeCables = Object.values(FringeCableEnum);
export const fringeBracings = Object.values(FringeBracingEnum);
export const fringeExtMults = Object.values(FringeExtensionMultEnum);
export const fringeTeeColour = Object.values(FringeTeeColourEnum);
export const fringeLeds = Object.values(FringeLedEnum);
export const fringeSurfaces = Object.values(FringeSurfaceEnum);
export const fringeExtensionColor = Object.values(FringeExtensionColorEnum);

export const defaultFringe: FringeType = {
  title: "Бахрома",
  length: 0,
  glowShade: FringeGlowShadeEnum.Warm,
  glowMode: FringeGlowModeEnum.Flickering,
  cable: FringeCableEnum.Black,
  bracing: FringeBracingEnum.Bracket,
  extensionQuantity: 0,
  teeQuantity: 0,
  powerQuantity: 0,
  extensionMult: FringeExtensionMultEnum.m_3,
  teeColour: FringeTeeColourEnum.Black,
  led: FringeLedEnum.led_100,
  contours: 0,
  surface: FringeSurfaceEnum.Wood,
  extensionColor: FringeExtensionColorEnum.Black,
};
