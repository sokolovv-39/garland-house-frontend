import { BeltLightLampStepEnum } from "../model";

export function getBeltLightLength(length: number) {
  const skein = 50;
  const skeinsQuantity = Math.ceil(length / skein);
  return skeinsQuantity;
}

export function getBeltLightLamps(step: BeltLightLampStepEnum, length: number) {
  if (step === BeltLightLampStepEnum.cm_20) {
    const lamps = length * 5;
    const reserved = 1.1 * lamps;
    return Math.ceil(reserved);
  } else if (step === BeltLightLampStepEnum.cm_40) {
    const lamps = length * 2.5;
    const reserved = 1.1 * lamps;
    return Math.ceil(reserved);
  }
  return 0
}
