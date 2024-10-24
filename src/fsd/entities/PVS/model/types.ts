export enum PVSColorEnum {
  Black = "Черный",
  White = "Белый",
}

export type PVSType = {
  title: "Кабель ПВС";
  length: number;
  color: PVSColorEnum;
  price: number;
  extraPrice: number;
};
