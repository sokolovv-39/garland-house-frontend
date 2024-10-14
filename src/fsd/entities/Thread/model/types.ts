export enum ThreadGlowShadeEnum {
  Warm = "Теплый",
  Cold = "Холодный",
  RGB = "RGB",
  Other = '7 цветов'
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
  Rope = 'Трос'
}

export enum ThreadExtensionMultEnum {
  m_1 = "1 м",
  m_3 = "3 м"
}

export enum ThreadSurfaceEnum {
  Wood = 'Дерево',
  Concrete = 'Бетон'
}

export type ThreadType = {
  title: "Нить";
  length: number;
  glowShade: ThreadGlowShadeEnum;
  glowMode: ThreadGlowModeEnum;
  wire: ThreadWireEnum;
  bracing: ThreadBracingEnum;
  powerQuantity: number;
  extensionMult: ThreadExtensionMultEnum;
  extensionQuantity: number;
  teeQuantity: number;
  surface: ThreadSurfaceEnum;
  contours: number
};
