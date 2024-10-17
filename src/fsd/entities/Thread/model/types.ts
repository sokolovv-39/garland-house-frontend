export enum ThreadGlowShadeEnum {
  Warm = "Теплый",
  Cold = "Холодный",
  RGB = "RGB",
  Other = "7 цветов",
}

export enum ThreadGlowModeEnum {
  Flickering = "Мерцание",
  Static_glow = "Статичное свечение",
}

export enum ThreadWireEnum {
  Black = "Черный",
  White = "Белый",
}

export enum ThreadBracingEnum {
  Screeds = "Стяжки",
  Rope = "Трос",
}

export enum ThreadSurfaceEnum {
  Wood = "Дерево",
  Concrete = "Бетон",
}

export type ThreadType = {
  title: "Нить";
  length: number;
  glowShade: ThreadGlowShadeEnum;
  glowMode: ThreadGlowModeEnum;
  wire: ThreadWireEnum;
  bracing: ThreadBracingEnum;
  powerQuantity: number;
  teeQuantity: number;
  surface: ThreadSurfaceEnum;
  contours: number;
  price: number;
  extensions_1m: number;
  extensions_3m: number;
  extensions_5m: number;
  extensions_10m: number;
};
