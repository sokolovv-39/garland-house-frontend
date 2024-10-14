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
  getItems,
}: {
  deleteItem: () => void;
  itemObj: ItemType<VagiType>;
  getItems: () => void;
}) {
  const idb = useContext(IDBContext);
  const [isOpen, setIsOpen] = useState(true);
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
  }, [vagi]);

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
