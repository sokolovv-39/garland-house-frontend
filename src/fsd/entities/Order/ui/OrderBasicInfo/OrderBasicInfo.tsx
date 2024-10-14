"use client";

import { useContext, useEffect, useState } from "react";
import classes from "./OrderBasicInfo.module.scss";
import {
  StatusTab,
  Input,
  Select,
  Button,
  Comments,
  IDBContext,
} from "@/fsd/shared";
import { defaultOrder, OrderType } from "../../model";
import { OrderActions } from "@/fsd/features";

const workersMocks = ["Александр П.", "Сергей А.", "Олег И.", "Антон У."];

export function OrderBasicInfo({ orderId }: { orderId: number }) {
  const idb = useContext(IDBContext);
  const [order, setOrder] = useState<OrderType>(defaultOrder);

  function getOrder() {
    idb?.orders
      .get(orderId)
      .then((order) => {
        setOrder(order);
      })
      .catch((err) => console.error(err));
  }

  function updateOrder() {
    if (order.id) {
      idb?.orders.update(order).catch((err) => console.error(err));
    }
  }

  useEffect(() => {
    getOrder();
  }, []);

  useEffect(() => {
    updateOrder();
  }, [order]);

  return (
    <div className={classes.wrapper}>
      <form className={classes.left}>
        <div className={classes.statusWrapper}>
          <span className={classes.statusText}>Статус</span>
          <div className={classes.status}>
            <StatusTab
              status="Назначен"
              inactive={order.status !== "Назначен"}
              onClick={() =>
                setOrder({
                  ...order,
                  status: "Назначен",
                })
              }
              button
            />
            <StatusTab
              status="Подписан"
              inactive={order.status !== "Подписан"}
              onClick={() =>
                setOrder({
                  ...order,
                  status: "Подписан",
                })
              }
              button
            />
            <StatusTab
              status="Проведен"
              inactive={order.status !== "Проведен"}
              onClick={() =>
                setOrder({
                  ...order,
                  status: "Проведен",
                })
              }
              button
            />
            <StatusTab
              status="Отменен"
              inactive={order.status !== "Отменен"}
              onClick={() =>
                setOrder({
                  ...order,
                  status: "Отменен",
                })
              }
              button
            />
          </div>
        </div>
        <div className={classes.info}>
          <Input
            type="text"
            placeholder="ФИО заказчика"
            initialValue={order.customer}
            onChange={(text) =>
              setOrder({
                ...order,
                customer: text,
              })
            }
          />
          <Input
            type="text"
            placeholder="Телефон заказчика"
            initialValue={order.customerPhone}
            onChange={(text) =>
              setOrder({
                ...order,
                customerPhone: text,
              })
            }
          />
          <Input
            type="text"
            placeholder="Адрес"
            initialValue={order.address}
            onChange={(text) =>
              setOrder({
                ...order,
                address: text,
              })
            }
          />
          <Input
            type="text"
            placeholder="Ссылка на Яндекс карты"
            initialValue={order.mapsLink}
            onChange={(text) =>
              setOrder({
                ...order,
                mapsLink: text,
              })
            }
          />
          <Input
            type="text"
            placeholder="Номер договора"
            initialValue={order.contractNumber}
            onChange={(text) => {
              setOrder({
                ...order,
                contractNumber: text,
              });
            }}
          />
          <div className={classes.selects}>
            <Select
              type="Менеджер"
              values={workersMocks}
              style={{
                flex: "1 0 auto",
              }}
              initialValue={order.manager}
              callback={(val) =>
                setOrder({
                  ...order,
                  manager: val,
                })
              }
            />
            <Select
              type="Исполнитель"
              values={workersMocks}
              style={{
                flex: "1 0 auto",
              }}
              initialValue={order.executor}
              callback={(val) =>
                setOrder({
                  ...order,
                  executor: val,
                })
              }
            />
          </div>
          <Input
            type="text"
            placeholder="Ссылка на AmoCRM"
            initialValue={order.amoCRMLink}
            onChange={(text) => {
              setOrder({
                ...order,
                amoCRMLink: text,
              });
            }}
          />
        </div>
        <OrderActions idb={idb!} orderId={orderId} />
      </form>
      <div className={classes.right}>
        <Input
          type="text"
          placeholder="Дата замера"
          initialValue={order.measureDate}
          onChange={(text) =>
            setOrder({
              ...order,
              measureDate: text,
            })
          }
        />
        <div className={classes.pay}>
          <Input
            type="text"
            placeholder="Кто платит за замер"
            initialValue={order.payer}
            onChange={(text) =>
              setOrder({
                ...order,
                payer: text,
              })
            }
          />
          <Input
            type="text"
            placeholder="Сумма за замер"
            initialValue={
              order.measurePrice ? order.measurePrice.toString() : ""
            }
            onChange={(text) => {
              if (text) {
                const toNum = +text;
                if (toNum)
                  setOrder({
                    ...order,
                    measurePrice: toNum,
                  });
              } else {
                setOrder({
                  ...order,
                  measurePrice: 0,
                });
              }
            }}
          />
        </div>
        <textarea
          className={classes.textarea}
          placeholder="Комментарий к замеру"
          value={order.clarification}
          onChange={(e) =>
            setOrder({
              ...order,
              clarification: e.currentTarget.value,
            })
          }
        ></textarea>
        <Comments />
      </div>
    </div>
  );
}
