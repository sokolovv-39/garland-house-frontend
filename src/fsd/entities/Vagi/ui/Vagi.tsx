"use client";

import {
  ArrowSVG,
  CloseSVG,
  NumberSelect,
  ItemsAdjust,
  IDBContext,
  Select,
} from "@/fsd/shared";
import classes from "./Vagi.module.scss";
import { useContext, useEffect, useState } from "react";
import { ItemType } from "../../Item";
import { VagiModelEnum, vagiModels, VagiType } from "../model";

export function Vagi({
  deleteItem,
  itemObj,
  updateCost,
  getItems,
  openedId,
  quantity,
}: {
  deleteItem: () => void;
  itemObj: ItemType<VagiType>;
  getItems: () => void;
  updateCost: () => void;
  openedId: string;
  quantity: number;
}) {
  const idb = useContext(IDBContext);
  const [isOpen, setIsOpen] = useState(false);
  const [vagi, setVagi] = useState<VagiType>(itemObj.item);

  function updateVagi() {
    idb?.items
      .update<VagiType>({
        ...itemObj,
        item: vagi,
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    updateVagi();
    getItems();
    updateCost();
  }, [vagi]);

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
    if (vagi.quantity < quantity)
      setVagi({
        ...vagi,
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
            type="Количество, шт"
            initialValue={vagi.quantity}
            callback={(val) => {
              setVagi({
                ...vagi,
                quantity: val,
              });
            }}
            minValue={quantity}
          />
          <div className={classes.tabs}>
            <ItemsAdjust
              list={vagiModels}
              active={itemObj.item.model}
              callback={(val) =>
                setVagi({
                  ...vagi,
                  model: val as VagiModelEnum,
                })
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
