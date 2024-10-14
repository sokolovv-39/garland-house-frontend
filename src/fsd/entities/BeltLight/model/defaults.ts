import {
  BeltLightCableEnum,
  BeltLightGlowShadeEnum,
  BeltLightLampStepEnum,
  BeltLightType,
} from "./types";

export const beltLightGlowShades = Object.values(BeltLightGlowShadeEnum);
export const beltLightLampSteps = Object.values(BeltLightLampStepEnum);
export const beltLightCables = Object.values(BeltLightCableEnum);

export const beltLightDefault: BeltLightType = {
  title: "Белт-лайт",
  length: 0,
  glowShade: BeltLightGlowShadeEnum.Warm,
  lampStep: BeltLightLampStepEnum.cm_20,
  cable: BeltLightCableEnum.Black,
};
