export enum CurtainBracingEnum {
  Rope = "Трос",
  Screed = "Стяжка",
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

export enum CurtainSizeEnum {
  s_2_1 = "2*1 м",
  s_2_1d5 = "2*1.5 м",
  s_2_2 = "2*2 м",
  s_2_3 = "2*3 м",
  s_2_4 = "2*4 м",
  s_2_6 = "2*6 м",
  s_2_9 = "2*9 м",
}

export type CurtainType = {
  title: string;
  size: string;
  bracing: CurtainBracingEnum;
  glowShade: CurtainGlowShadeEnum;
  glowMode: CurtainGlowModeEnum;
  cable: CurtainCableEnum;
  surface: CurtainSurfaceEnum;
  priceObj: {
    s_2_1: number;
    s_2_1dot5: number;
    s_2_2: number;
    s_2_3: number;
    s_2_4: number;
    s_2_6: number;
    s_2_9: number;
  };
  quantity: number;
  contours: number;
};
