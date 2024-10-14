export enum VagiModelEnum {
  wire_2 = "2-проводная клемма",
  wire_3 = "3-проводная клемма",
  wire_5 = "5-проводная клемма",
}

export type VagiType = {
    title: "Ваги (клемма)";
    model: VagiModelEnum
};
