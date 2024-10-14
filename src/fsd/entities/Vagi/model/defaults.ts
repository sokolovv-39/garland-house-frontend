import { VagiModelEnum, VagiType } from "./types";

export const vagiModels = Object.values(VagiModelEnum);

export const vagiDefault: VagiType = {
  title: "Ваги (клемма)",
  model: VagiModelEnum.wire_2,
};
