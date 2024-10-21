"use client";

import {
  ArrowSVG,
  CloseSVG,
  NumberSelect,
  IDBContext,
  ItemsAdjust,
} from "@/fsd/shared";
import classes from "./PVS.module.scss";
import { useContext, useEffect, useState } from "react";
import { ItemType } from "../../Item";
import { PVSColorEnum, pvsColors, PVSType } from "../model";

export function PVS({
  deleteItem,
  itemObj,
  getItems,
  updateCost,
  openedId,
}: {
  deleteItem: () => void;
  itemObj: ItemType<PVSType>;
  getItems: () => void;
  updateCost: () => void;
  openedId: string;
}) {
  const idb = useContext(IDBContext);
  const [isOpen, setIsOpen] = useState(false);
  const [pvs, setPvs] = useState<PVSType>(itemObj.item);

  function updatePVS() {
    idb?.items
      .update<PVSType>({
        ...itemObj,
        item: pvs,
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    updatePVS();
    getItems();
    updateCost();
  }, [pvs]);

  useEffect(() => {
    setIsOpen(openedId === itemObj.id);
  }, [openedId]);

  useEffect(() => {
    window.scrollTo({
      top: 400,
      behavior: "smooth",
    });
  }, []);

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
          {!isOpen && itemObj.item.length !== 0 && (
            <span>{itemObj.item.length} м</span>
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
            type="Длина, м"
            callback={(val) =>
              setPvs({
                ...pvs,
                length: val,
              })
            }
            initialValue={itemObj.item.length}
          />
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>Цвет</h5>
            <ItemsAdjust
              list={pvsColors}
              active={itemObj.item.color}
              callback={(val) =>
                setPvs({
                  ...pvs,
                  color: val as PVSColorEnum,
                })
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
