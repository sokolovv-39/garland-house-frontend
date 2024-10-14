"use client";

import {
  ArrowSVG,
  CloseSVG,
  NumberSelect,
  ItemsAdjust,
  IDBContext,
} from "@/fsd/shared";
import classes from "./CorrugationPVS.module.scss";
import { useContext, useEffect, useState } from "react";
import { ItemType } from "../../Item";
import { CorrColorsEnum, corrColours, CorrThicknessEnum, corrThicknesses, CorrugationType } from "../model";

export function CorrugationPVS({
  deleteItem,
  itemObj,
  getItems
}: {
  deleteItem: () => void;
    itemObj: ItemType<CorrugationType>;
  getItems: () => void
}) {
  const idb = useContext(IDBContext);
  const [isOpen, setIsOpen] = useState(true);
  const [corr, setCorr] = useState<CorrugationType>(itemObj.item);

  function updateCorr() {
    idb?.items
      .update<CorrugationType>({
        ...itemObj,
        item: corr,
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    updateCorr();
    getItems()
  }, [corr]);

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
            <h5 className={classes.tabsTitle}>Толщина</h5>
            <ItemsAdjust
              list={corrThicknesses}
              active={itemObj.item.thickness}
              callback={(val) =>
                setCorr({
                  ...corr,
                  thickness: val as CorrThicknessEnum,
                })
              }
            />
          </div>
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>Цвет</h5>
            <ItemsAdjust
              list={corrColours}
              active={itemObj.item.color}
              callback={(val) =>
                setCorr({
                  ...corr,
                  color: val as CorrColorsEnum,
                })
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
