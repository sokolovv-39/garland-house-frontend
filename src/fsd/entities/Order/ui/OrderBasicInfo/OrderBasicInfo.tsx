"use client";

import { useContext, useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import classes from "./OrderBasicInfo.module.scss";
import {
  StatusTab,
  Input,
  Select,
  Button,
  Comments,
  IDBContext,
  DateFormatter,
} from "@/fsd/shared";
import { defaultOrder, OrderType } from "../../model";
import { OrderActions } from "@/fsd/features";
import { generateRFP } from "@/fsd/features/OrderActions/lib";

const workersMocks = ["Александр П.", "Сергей А.", "Олег И.", "Антон У."];

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export function OrderBasicInfo({ orderId }: { orderId: number }) {
  const idb = useContext(IDBContext);
  const [order, setOrder] = useState<OrderType>(defaultOrder);
  const [date, changeDate] = useState<Value>(new Date());
  const [isShowCalendar, setIsShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  function getOrder() {
    idb?.orders
      .get(orderId)
      .then(async (order) => {
        setOrder({
          ...order,
        });
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

  useEffect(() => {
    let formattedDate;
    if (date instanceof Date) {
      formattedDate = new DateFormatter(date).dateToDMY();
    } else if (Array.isArray(date)) {
      const validDates = date.filter((d): d is Date => d instanceof Date);
      if (validDates.length > 0) {
        formattedDate = new DateFormatter(validDates[0]).dateToDMY(); // или обработать по-другому
      }
    }

    if (formattedDate) {
      setOrder({
        ...order,
        measureDate: formattedDate,
      });
    }
  }, [date]);

  useEffect(() => {
    const el = calendarRef.current;

    function handleClick(e: MouseEvent) {
      if (el) {
        if (!el.contains(e.target as Node)) {
          setIsShowCalendar(false);
        }
      }
    }

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

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
            littleType
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
            littleType
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
            littleType
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
            isLink
            littleType
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
            littleType
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
              littleType
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
              littleType
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
            isLink
            littleType
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
        {/* <Input
          littleType
          type="text"
          placeholder="Дата замера"
          initialValue={order.measureDate}
          onChange={(text) =>
            setOrder({
              ...order,
              measureDate: text,
            })
          }
        /> */}
        <div className={classes.times}>
          <div className={classes.calendarWrapper} ref={calendarRef}>
            <div
              className={classes.calendarTab}
              onClick={() => setIsShowCalendar(!isShowCalendar)}
            >
              <span className={classes.little}>Дата замера</span>
              <span className={classes.calendarInfo}>{order.measureDate}</span>
            </div>
            {isShowCalendar && (
              <Calendar onChange={changeDate} className={classes.calendar} />
            )}
          </div>
          <Input
            wrapperStyles={{
              flex: "1 0 0",
            }}
            littleType
            type="text"
            placeholder="Время на выполнение замера, ч"
            initialValue={order.duration}
            onChange={(text) =>
              setOrder({
                ...order,
                duration: text,
              })
            }
          />
        </div>
        <div className={classes.pay}>
          <Select
            type="Кто платит за замер"
            values={["Компания", "Клиент"]}
            littleType
            initialValue={order.payer}
            callback={(val) =>
              setOrder({
                ...order,
                payer: val,
              })
            }
          />
          <Input
            littleType
            isPrice
            type="text"
            placeholder="Сумма за замер"
            initialValue={
              order.measurePrice ? order.measurePrice.toString() : ""
            }
            onChange={(text) => {
              if (text) {
                const toNum = parseInt(text.replace(/\s/g, ""));
                if (toNum) {
                  if (!isFinite(toNum)) {
                    setOrder({
                      ...order,
                      measurePrice: 0,
                    });
                  } else {
                    setOrder({
                      ...order,
                      measurePrice: toNum,
                    });
                  }
                }
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
        <Input
          littleType
          isPrice
          type="text"
          placeholder="Цена со скидкой"
          initialValue={
            order.priceWithDiscount ? order.priceWithDiscount.toString() : ""
          }
          onChange={(text) => {
            if (text) {
              const toNum = parseInt(text.replace(/\s/g, ""));
              if (toNum) {
                if (!isFinite(toNum)) {
                  setOrder({
                    ...order,
                    priceWithDiscount: 0,
                  });
                } else {
                  setOrder({
                    ...order,
                    priceWithDiscount: toNum,
                  });
                }
              }
            } else {
              setOrder({
                ...order,
                priceWithDiscount: 0,
              });
            }
          }}
        />
        <Comments />
      </div>
    </div>
  );
}
