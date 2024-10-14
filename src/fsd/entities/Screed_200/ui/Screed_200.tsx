"use client";

import { ArrowSVG, CloseSVG, NumberSelect, IDBContext } from "@/fsd/shared";
import classes from "./Screed_200.module.scss";
import { useContext, useEffect, useState } from "react";
import { ItemType } from "../../Item";
import { Screed_200_Type } from "../model";

export function Screed_200({
  deleteItem,
  itemObj,
  getItems,
}: {
  deleteItem: () => void;
  itemObj: ItemType<Screed_200_Type>;
  getItems: () => void;
}) {
  const idb = useContext(IDBContext);
  const [isOpen, setIsOpen] = useState(true);
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
  }, [item]);

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
            type="Количество, шт"
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
