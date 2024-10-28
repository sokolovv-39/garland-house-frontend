"use client";

import { ArrowSVG, CloseSVG, NumberSelect, IDBContext } from "@/fsd/shared";
import classes from "./ElectricShield.module.scss";
import { useContext, useState, useEffect, useRef } from "react";
import { ItemType } from "../../Item";
import { ElectricShieldType } from "../model";

export function ElectricShield({
  deleteItem,
  itemObj,
  getItems,
  updateCost,
  openedId,
}: {
  deleteItem: () => void;
  itemObj: ItemType<ElectricShieldType>;
  getItems: () => void;
  updateCost: () => void;
  openedId: string;
}) {
  const idb = useContext(IDBContext);
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState<ElectricShieldType>(itemObj.item);
  const wrapperRef = useRef<HTMLDivElement>(null);

  function updateItem() {
    idb?.items
      .update<ElectricShieldType>({
        ...itemObj,
        item,
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    updateItem();
    getItems();
    updateCost();
  }, [item]);

  useEffect(() => {
    setIsOpen(openedId === itemObj.id);
  }, [openedId]);

  useEffect(() => {
    let y = 0;
    setTimeout(() => {
      if (wrapperRef.current) {
        y = wrapperRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }
    }, 100); // Отложите на 100 мс или больше, если требуется
  }, []);

  return (
    <div className={classes.wrapper} ref={wrapperRef}>
      <div className={classes.header} onClick={() => setIsOpen(!isOpen)}>
        <div className={classes.titleWrapper}>
          <h4 className={classes.title}>{itemObj.item.title}</h4>
          {!isOpen && (
            <CloseSVG width="20" height="20" onClick={() => deleteItem()} />
          )}
        </div>
        <div className={classes.arrowWrapper}>
          {!isOpen && itemObj.item.quantity !== 0 && (
            <span>{itemObj.item.quantity} шт</span>
          )}
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
            type="Количество, шт"
            callback={(val) =>
              setItem({
                ...item,
                quantity: val,
              })
            }
            initialValue={itemObj.item.quantity}
            minValue={1}
          />
        </div>
      )}
    </div>
  );
}
