"use client";

import {
  ArrowSVG,
  CloseSVG,
  NumberSelect,
  ItemsAdjust,
  IDBContext,
  Select,
} from "@/fsd/shared";
import classes from "./SolderBox.module.scss";
import { useContext, useEffect, useState } from "react";
import { SolderBoxColorEnum } from "../model";
import { ItemType } from "../../Item";
import { SolderBoxType } from "../model";
import { solderBoxColors } from "../model";

export function SolderBox({
  deleteItem,
  itemObj,
  getItems,
  updateCost,
  openedId,
  quantity,
}: {
  deleteItem: () => void;
  itemObj: ItemType<SolderBoxType>;
  getItems: () => void;
  updateCost: () => void;
  openedId: string;
  quantity: number;
}) {
  const idb = useContext(IDBContext);
  const [isOpen, setIsOpen] = useState(false);
  const [box, setBox] = useState<SolderBoxType>(itemObj.item);

  function updateBox() {
    idb?.items
      .update<SolderBoxType>({
        ...itemObj,
        item: box,
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    updateBox();
    getItems();
    updateCost();
  }, [box]);

  useEffect(() => {
    setIsOpen(openedId === itemObj.id);
  }, [openedId]);

  useEffect(() => {
    window.scrollTo({
      top: 400,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (box.quantity < quantity)
      setBox({
        ...box,
        quantity,
      });
  }, [quantity]);

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
          {!isOpen && <span>{itemObj.item.quantity} шт</span>}
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
            initialValue={box.quantity}
            type="Количество, шт"
            minValue={quantity}
            callback={(val) => {
              setBox({
                ...box,
                quantity: val,
              });
            }}
          />
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>Цвет</h5>
            <ItemsAdjust
              list={solderBoxColors}
              active={itemObj.item.color}
              callback={(val) =>
                setBox({
                  ...box,
                  color: val as SolderBoxColorEnum,
                })
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
