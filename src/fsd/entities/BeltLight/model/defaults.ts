import { PVSColorEnum } from "../../PVS";
import {
  BeltLightGlowShadeEnum,
  BeltLightLampStepEnum,
  BeltLightType,
} from "./types";

export const beltLightGlowShades = Object.values(BeltLightGlowShadeEnum);
export const beltLightLampSteps = Object.values(BeltLightLampStepEnum);
export const beltLightCables = Object.values(PVSColorEnum);

export const beltLightDefault: BeltLightType = {
  title: "Белт-лайт",
  length: 0,
  glowShade: BeltLightGlowShadeEnum.Warm,
  lampStep: BeltLightLampStepEnum.cm_20,
  cable: PVSColorEnum.Black,
  price: 4520,
  contours: 0,
  pvsLength: 0,
};
