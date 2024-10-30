import { PVSColorEnum } from "../../PVS";
import {
  ThreadBracingEnum,
  ThreadGlowModeEnum,
  ThreadGlowShadeEnum,
  ThreadType,
  ThreadSurfaceEnum,
  ThreadScreedsTypeEnum,
} from "./types";

export const threadGlowShades = Object.values(ThreadGlowShadeEnum);
export const threadGlowMode = Object.values(ThreadGlowModeEnum);
export const threadCables = Object.values(PVSColorEnum);
export const threadBracings = Object.values(ThreadBracingEnum);
export const threadSurfaces = Object.values(ThreadSurfaceEnum);
export const threadScreedTypes = Object.values(ThreadScreedsTypeEnum);

export const defaultThread: ThreadType = {
  title: "Нить",
  length: 1,
  glowShade: ThreadGlowShadeEnum.Warm,
  glowMode: ThreadGlowModeEnum.Flickering,
  cable: PVSColorEnum.Black,
  bracing: ThreadBracingEnum.Screeds,
  powerUnits: 1,
  tees: 0,
  surface: ThreadSurfaceEnum.Wood,
  contours: 1,
  priceObj: {
    one_color: 550,
    multi: 750,
    rgb: 550,
    price_screed_bracing: 230,
  },
  extensions_1m: 0,
  extensions_3m: 0,
  extensions_5m: 0,
  extensions_10m: 0,
  screedsType: ThreadScreedsTypeEnum.Screed_200,
  tree: {
    isActive: false,
    height: 1,
    price: 150,
  },
};
