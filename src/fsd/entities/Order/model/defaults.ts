import { DateFormatter } from "@/fsd/shared";
import { OrderStatusType, OrderType } from "./types";

export const defaultOrder: OrderType = {
  status: "Назначен",
  customer: "",
  customerPhone: "",
  mapsLink: "",
  contractNumber: "",
  manager: "",
  executor: "",
  amoCRMLink: "",
  id: "",
  measureDate: "",
  measurePrice: 0,
  payer: "",
  clarification: "",
  address: "",
  comments: [],
  numberOfOrder: 0,
  priceWithDiscount: 0,
  duration: "",
  rfpFork: {
    maxRfpPrice: 0,
    minRfpPrice: 0,
    noData: true,
  },
};

export const orderStatuses: OrderStatusType[] = [
  "Назначен",
  "Подписан",
  "Проведен",
  "Отменен",
];
