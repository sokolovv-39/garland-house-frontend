export type OrderType = {
  status: OrderStatusType;
  customer: string;
  customerPhone: string;
  mapsLink: string;
  contractNumber: string;
  manager: string;
  executor: string;
  amoCRMLink: string;
  id: string;
  measureDate: string;
  measurePrice: number;
  payer: string;
  clarification: string;
  address: string;
  comments: CommentType[];
  numberOfOrder: number;
};

type CommentType = {
  name: string;
  text: string;
  date: Date;
};

export type OrderStatusType = "Назначен" | "Подписан" | "Проведен" | "Отменен";
