export enum FringeGlowShadeEnum {
  Warm = "Теплый",
  Cold = "Холодный",
  RGB = "RGB",
}
export enum FringeGlowModeEnum {
  Flickering = "Мерцание",
  Static_glow = "Статичное свечение",
}
export enum FringeCableEnum {
  Black = "Черный",
  White = "Белый",
}
export enum FringeBracingEnum {
  Bracket = "Скоба кабельная",
  Rope = "Трос",
}

export enum FringeLedEnum {
  led_100 = "100 led",
  led_200 = "200 led",
}

export enum FringeSurfaceEnum {
  Wood = "Дерево",
  Concrete = "Бетон",
}

export enum FringeMultiplicityEnum {
  m_3 = "3 метра",
  m_5 = "5 метров",
}

export type FringeType = {
  multiplicity: FringeMultiplicityEnum;
  title: "Бахрома";
  length: number;
  glowShade: FringeGlowShadeEnum;
  glowMode: FringeGlowModeEnum;
  cable: FringeCableEnum;
  bracing: FringeBracingEnum;
  tees: number;
  powerUnits: number;
  led: FringeLedEnum;
  contours: number;
  surface: FringeSurfaceEnum;
  price: number;
  extensions_1m: number;
  extensions_3m: number;
  extensions_5m: number;
  extensions_10m: number;
};
