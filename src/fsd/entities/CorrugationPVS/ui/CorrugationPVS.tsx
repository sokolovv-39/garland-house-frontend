"use client";

import {
  ArrowSVG,
  CloseSVG,
  NumberSelect,
  ItemsAdjust,
  IDBContext,
} from "@/fsd/shared";
import classes from "./CorrugationPVS.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { CommonItemType, ItemType } from "../../Item";
import {
  CorrColorsEnum,
  corrColours,
  CorrThicknessEnum,
  corrThicknesses,
  CorrugationType,
} from "../model";
import { generateRFP } from "@/fsd/features/OrderActions/lib";
import { getPVSLength } from "../../PVS";

export function CorrugationPVS({
  deleteItem,
  itemObj,
  getItems,
  updateCost,
  openedId,
}: {
  deleteItem: () => void;
  itemObj: ItemType<CorrugationType>;
  getItems: () => Promise<CommonItemType[]>;
  updateCost: () => void;
  openedId: string;
}) {
  const idb = useContext(IDBContext);
  const [isOpen, setIsOpen] = useState(false);
  const [corr, setCorr] = useState<CorrugationType>(itemObj.item);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
    getItems();
    updateCost();
  }, [corr]);

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
            type="Длина"
            initialValue={corr.length}
            callback={(val) => {
              setCorr({
                ...corr,
                length: val,
              });
            }}
            minValue={1}
          />
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
