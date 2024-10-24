"use client";

import { ArrowSVG, CloseSVG, IDBContext, NumberSelect } from "@/fsd/shared";
import classes from "./Montage.module.scss";
import { useContext, useState, useEffect } from "react";
import { ItemType } from "../../Item";
import { MontageType } from "../model";

export function Montage({
  deleteItem,
  itemObj,
  getItems,
  updateCost,
  openedId,
}: {
  deleteItem: () => void;
  itemObj: ItemType<MontageType>;
  getItems: () => void;
  updateCost: () => void;
  openedId: string;
}) {
  const idb = useContext(IDBContext);
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState<MontageType>(itemObj.item);

  function updateBeltLight() {
    idb?.items
      .update<MontageType>({
        ...itemObj,
        item,
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    updateBeltLight();
    getItems();
    updateCost();
  }, [item]);

  useEffect(() => {
    setIsOpen(openedId === itemObj.id);
  }, [openedId]);

  useEffect(() => {
    window.scrollTo({
      top: 400,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.header} onClick={() => setIsOpen(!isOpen)}>
        <div className={classes.titleWrapper}>
          <h4 className={classes.title}>{itemObj.item.title}</h4>
          {!isOpen && (
            <CloseSVG width="20" height="20" onClick={() => deleteItem()} />
          )}
        </div>
        <div className={classes.arrowWrapper}>
          <ArrowSVG
            style={{
              transform: `${isOpen ? "" : "rotate(180deg)"}`,
            }}
          />
        </div>
      </div>
      {isOpen && (
        <div className={classes.adjust}>
          <NumberSelect
            initialValue={itemObj.item.complex_fringe}
            type="Сложный монтаж бахромы, метры"
            callback={(val) => {
              setItem({
                ...item,
                complex_fringe: val,
              });
            }}
          />
          <NumberSelect
            initialValue={itemObj.item.complex_neon}
            type="Сложный монтаж неона, метры"
            callback={(val) => {
              setItem({
                ...item,
                complex_neon: val,
              });
            }}
          />
          <NumberSelect
            initialValue={itemObj.item.complex_thread}
            type="Сложный монтаж нити, метры"
            callback={(val) => {
              setItem({
                ...item,
                complex_thread: val,
              });
            }}
          />
          <NumberSelect
            initialValue={itemObj.item.m_16_20}
            type="Автовышка 16-20 метров (смена)"
            callback={(val) => {
              setItem({
                ...item,
                m_16_20: val,
              });
            }}
          />
          <NumberSelect
            initialValue={itemObj.item.m_22_24}
            type="Автовышка 22-24 метров (смена)"
            callback={(val) => {
              setItem({
                ...item,
                m_22_24: val,
              });
            }}
          />
          <NumberSelect
            initialValue={itemObj.item.m_26_36}
            type="Автовышка 26-36 метров (смена)"
            callback={(val) => {
              setItem({
                ...item,
                m_26_36: val,
              });
            }}
          />
          <NumberSelect
            initialValue={itemObj.item.distance}
            type="Монтаж оборудования с выездом, км"
            callback={(val) => {
              setItem({
                ...item,
                distance: val,
              });
            }}
          />
          <NumberSelect
            initialValue={itemObj.item.m_26_36_hourly}
            type="Автовышка почасовая, часы"
            callback={(val) => {
              setItem({
                ...item,
                m_26_36_hourly: val,
              });
            }}
          />
          <NumberSelect
            initialValue={itemObj.item.climber}
            type="Альпинист (смена), руб"
            callback={(val) => {
              setItem({
                ...item,
                climber: val,
              });
            }}
          />
        </div>
      )}
    </div>
  );
}
