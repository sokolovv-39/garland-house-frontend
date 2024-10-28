"use client";

import {
  ArrowSVG,
  CloseSVG,
  NumberSelect,
  IDBContext,
  ItemsAdjust,
} from "@/fsd/shared";
import classes from "./Screed_480_500.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { ItemType } from "../../Item";
import { screed_480_500_colors, Screed_480_500_Type } from "../model";
import { PVSColorEnum } from "../../PVS";
import { screeds_480_500_pack } from "../lib/estimateAlgs";

export function Screed_480_500({
  deleteItem,
  itemObj,
  getItems,
  updateCost,
  openedId,
  quantity,
}: {
  deleteItem: () => void;
  itemObj: ItemType<Screed_480_500_Type>;
  getItems: () => void;
  updateCost: () => void;
  openedId: string;
  quantity: number;
}) {
  const idb = useContext(IDBContext);
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState<Screed_480_500_Type>(itemObj.item);
  const wrapperRef = useRef<HTMLDivElement>(null);

  function updateItem() {
    idb?.items
      .update<Screed_480_500_Type>({
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

  useEffect(() => {
    setItem({
      ...item,
      quantity,
    });
  }, [quantity]);

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
          {!isOpen && <span>{itemObj.item.quantity} уп</span>}
          <ArrowSVG
            style={{
              transform: `${isOpen ? "" : "rotate(180deg)"}`,
            }}
          />
        </div>
      </div>
      {isOpen && (
        <div className={classes.adjust}>
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>Цвет стяжек</h5>
            <ItemsAdjust
              list={screed_480_500_colors}
              active={itemObj.item.color}
              callback={(val) =>
                setItem({
                  ...item,
                  color: val as PVSColorEnum,
                })
              }
            />
          </div>
          <NumberSelect
            type="Количество, уп"
            initialValue={itemObj.item.quantity}
            callback={(val) =>
              setItem({
                ...item,
                quantity: val,
              })
            }
          />
        </div>
      )}
    </div>
  );
}
