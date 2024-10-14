import { OrderType } from "../types";

export const mockOrders: OrderType[] = [];

for (let i = 1; i <= 30; i++) {
  mockOrders.push({
    status:
      i % 4 === 0
        ? "Отменен"
        : i % 3 === 0
        ? "Проведен"
        : i % 2 === 0
        ? "Подписан"
        : "Назначен",
    customer: `Клиент ${i}`,
    customerPhone: `+799900000${i}`,
    mapsLink: `https://maps.google.com/?q=address${i}`,
    contractNumber: `CNT0000${i}`,
    manager: `Менеджер ${i}`,
    executor: `Исполнитель ${i}`,
    amoCRMLink: `https://amoCRM.com/link${i}`,
    id: `${i}`,
    measureDate: "13 октября",
    measurePrice: 5000 + i * 100,
    payer: `Компания ${i}`,
    clarification: `Уточнение ${i}`,
    address: `Город, Улица ${i}, д.${i}`,
    numberOfOrder: i,
    comments: [
      {
        name: `Комментатор ${i}`,
        text: `Комментарий ${i}`,
        date: new Date(2024, i % 12, i + 1),
      },
    ],
  });
}
