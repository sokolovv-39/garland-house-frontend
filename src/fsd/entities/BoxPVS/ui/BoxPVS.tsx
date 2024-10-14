"use client";

import {
  ArrowSVG,
  CloseSVG,
  NumberSelect,
  ItemsAdjust,
  IDBContext,
  Select,
} from "@/fsd/shared";
import classes from "./BoxPVS.module.scss";
import { useContext, useEffect, useState } from "react";
import { ItemType } from "../../Item";
import { BoxPVSColourEnum, boxPvsColours, BoxPVSType } from "../model";

export function BoxPVS({
  deleteItem,
  itemObj,
  getItems,
}: {
  deleteItem: () => void;
  itemObj: ItemType<BoxPVSType>;
  getItems: () => void;
}) {
  const idb = useContext(IDBContext);
  const [isOpen, setIsOpen] = useState(true);
  const [box, setBox] = useState<BoxPVSType>(itemObj.item);

  function updateBox() {
    idb?.items
      .update<BoxPVSType>({
        ...itemObj,
        item: box,
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    updateBox();
    getItems();
  }, [box]);

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
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>Длина</h5>
          </div>
          <Select
            type="Цвет"
            values={boxPvsColours}
            initialValue={itemObj.item.color}
            callback={(val) =>
              setBox({
                ...box,
                color: val as BoxPVSColourEnum,
              })
            }
          />
        </div>
      )}
    </div>
  );
}
