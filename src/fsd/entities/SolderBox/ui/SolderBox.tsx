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
}: {
  deleteItem: () => void;
  itemObj: ItemType<SolderBoxType>;
  getItems: () => void;
}) {
  const idb = useContext(IDBContext);
  const [isOpen, setIsOpen] = useState(true);
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
    console.log('render')
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
