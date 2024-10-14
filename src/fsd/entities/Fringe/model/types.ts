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

export enum FringeExtensionMultEnum {
  m_1 = "1 м",
  m_3 = "3 м",
  m_5 = "5 м",
  m_10 = "10 м",
}

export enum FringeTeeColourEnum {
  Black = "Черный",
  White = "Белый",
}

export enum FringeLedEnum {
  led_100 = "100 led",
  led_200 = "200 led",
}

export enum FringeSurfaceEnum {
  Wood = "Дерево",
  Concrete = "Бетон",
}

export enum FringeExtensionColorEnum {
  Black = "Черный",
  White = "Белый",
}

export type FringeType = {
  title: "Бахрома";
  length: number;
  glowShade: FringeGlowShadeEnum;
  glowMode: FringeGlowModeEnum;
  cable: FringeCableEnum;
  bracing: FringeBracingEnum;
  extensionQuantity: number;
  teeQuantity: number;
  powerQuantity: number;
  extensionMult: FringeExtensionMultEnum;
  teeColour: FringeTeeColourEnum;
  led: FringeLedEnum;
  contours: number;
  surface: FringeSurfaceEnum;
  extensionColor: FringeExtensionColorEnum
};
