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
  id: '',
  measureDate: '10 октября',
  measurePrice: 0,
  payer: "",
  clarification: "",
  address: "",
  comments: [],
  numberOfOrder: 0,
};

export const orderStatuses: OrderStatusType[] = ['Назначен', 'Подписан', 'Проведен', 'Отменен']
