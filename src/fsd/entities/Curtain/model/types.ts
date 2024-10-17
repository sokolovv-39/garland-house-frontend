export enum CurtainBracingEnum {
  Rope = "Трос",
  Screed = "Стяжка",
}
export enum CurtainSizeEnum {
  s_2_1 = "2*1 м",
  s_2_1d5 = "2*1.5 м",
  s_2_2 = "2*2 м",
  s_2_3 = "2*3 м",
  s_2_4 = "2*4 м",
  s_2_6 = "2*6 м",
  s_2_9 = "2*9 м",
}

export enum CurtainGlowShadeEnum {
  Warm = "Теплый",
  Cold = "Холодный",
}

export enum CurtainGlowModeEnum {
  Flickering = "Мерцание",
  Static_glow = "Статическое свечение",
}

export enum CurtainCableEnum {
  Black = "Черный",
  White = "Белый",
  Transparent = "Прозрачный",
}

export enum CurtainSurfaceEnum {
  Wood = "Дерево",
  Concrete = "Бетон",
}

export enum CurtainExtColorEnum {
  Black = "Черный",
  White = "Белый",
}

export type CurtainType = {
  title: string;
  size: string;
  bracing: CurtainBracingEnum;
  teeQuantity: number;
  glowShade: CurtainGlowShadeEnum;
  glowMode: CurtainGlowModeEnum;
  cable: CurtainCableEnum;
  surface: CurtainSurfaceEnum;
  price: number;
  extensions_1m: number;
  extensions_3m: number;
  extensions_5m: number;
  extensions_10m: number;
  extColor: CurtainExtColorEnum;
};
