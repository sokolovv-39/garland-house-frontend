import {
  ThreadBracingEnum,
  ThreadWireEnum,
  ThreadGlowModeEnum,
  ThreadGlowShadeEnum,
  ThreadType,
  ThreadSurfaceEnum,
} from "./types";

export const threadGlowShades = Object.values(ThreadGlowShadeEnum);
export const threadGlowMode = Object.values(ThreadGlowModeEnum);
export const threadWires = Object.values(ThreadWireEnum);
export const threadBracings = Object.values(ThreadBracingEnum);
export const threadSurfaces = Object.values(ThreadSurfaceEnum);

export const defaultThread: ThreadType = {
  title: "Нить",
  length: 0,
  glowShade: ThreadGlowShadeEnum.Warm,
  glowMode: ThreadGlowModeEnum.Flickering,
  wire: ThreadWireEnum.Black,
  bracing: ThreadBracingEnum.Screeds,
  powerQuantity: 0,
  teeQuantity: 0,
  surface: ThreadSurfaceEnum.Wood,
  contours: 0,
  price: 4214,
  extensions_1m: 0,
  extensions_3m: 0,
  extensions_5m: 0,
  extensions_10m: 0,
};
