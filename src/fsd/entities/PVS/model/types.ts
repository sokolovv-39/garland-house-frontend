export enum PVSColorEnum {
  Black = "Черный",
  White = "Белый",
}

export type PVSType = {
  title: "Кабель ПВС";
  length: number;
  color: PVSColorEnum;
  priceObj: {
    extraPvs: number;
    extraCorrBox: number;
  };
};
