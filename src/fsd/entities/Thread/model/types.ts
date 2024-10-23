import { PVSColorEnum } from "../../PVS";

export enum ThreadGlowShadeEnum {
  Warm = "Теплый",
  Cold = "Холодный",
  RGB = "RGB",
  colors_7 = "7 цветов",
}

export enum ThreadGlowModeEnum {
  Flickering = "Мерцание",
  Static_glow = "Статичное свечение",
}

export enum ThreadBracingEnum {
  Screeds = "Стяжки",
  Rope = "Трос",
}

export enum ThreadSurfaceEnum {
  Wood = "Дерево",
  Concrete = "Бетон",
}

export enum ThreadScreedsTypeEnum {
  Screed_200 = "Стяжка 200мм",
  Screed_480_500 = "Стяжка 480-500мм",
}

export type ThreadType = {
  title: "Нить";
  length: number;
  glowShade: ThreadGlowShadeEnum;
  glowMode: ThreadGlowModeEnum;
  cable: PVSColorEnum;
  bracing: ThreadBracingEnum;
  powerUnits: number;
  tees: number;
  surface: ThreadSurfaceEnum;
  contours: number;
  price: number;
  extensions_1m: number;
  extensions_3m: number;
  extensions_5m: number;
  extensions_10m: number;
  screedsType: ThreadScreedsTypeEnum;
  price_screed_bracing: number;
};
