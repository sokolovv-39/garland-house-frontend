import { MediaType } from "../../Media";

export type ObjectType = {
  id: string;
  media: MediaType | null;
  orderId: number;
  title: string;
  measureId: string;
};
