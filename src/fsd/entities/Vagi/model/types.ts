export enum VagiModelEnum {
  wire_3 = "3-проводная клемма",
  wire_5 = "5-проводная клемма",
}

export type VagiType = {
  title: "Ваги (клемма)";
  model: VagiModelEnum;
  price: number;
  quantity: number;
};
