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
  length: 0,
  glowShade: ThreadGlowShadeEnum.Warm,
  glowMode: ThreadGlowModeEnum.Flickering,
  cable: PVSColorEnum.Black,
  bracing: ThreadBracingEnum.Screeds,
  powerUnits: 0,
  tees: 0,
  surface: ThreadSurfaceEnum.Wood,
  contours: 0,
  price: 4214,
  extensions_1m: 0,
  extensions_3m: 0,
  extensions_5m: 0,
  extensions_10m: 0,
  screedsType: ThreadScreedsTypeEnum.Screed_200,
};
