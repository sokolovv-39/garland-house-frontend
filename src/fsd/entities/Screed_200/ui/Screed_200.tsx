"use client";

import {
  ArrowSVG,
  CloseSVG,
  NumberSelect,
  IDBContext,
  ItemsAdjust,
} from "@/fsd/shared";
import classes from "./Screed_200.module.scss";
import { useContext, useEffect, useState } from "react";
import { ItemType } from "../../Item";
import { Screed_200_Type, screeds_200_colors } from "../model";
import { PVSColorEnum } from "../../PVS";

export function Screed_200({
  deleteItem,
  itemObj,
  getItems,
  updateCost,
  openedId,
  quantity,
}: {
  deleteItem: () => void;
  itemObj: ItemType<Screed_200_Type>;
  getItems: () => void;
  updateCost: () => void;
  openedId: string;
  quantity: number;
}) {
  const idb = useContext(IDBContext);
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState<Screed_200_Type>(itemObj.item);

  function updateItem() {
    idb?.items
      .update<Screed_200_Type>({
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
    window.scrollTo({
      top: 400,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    setItem({
      ...item,
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
              list={screeds_200_colors}
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
