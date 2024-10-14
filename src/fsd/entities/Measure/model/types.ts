import { ObjectType } from "../../Object";

export type MeasureType = {
  id: string;
  orderId: number;
  objectIds: string[];
  isFavourite: boolean;
  ownOrder: number
};
