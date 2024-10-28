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
import { useContext, useEffect, useRef, useState } from "react";
import { ItemType } from "../../Item";
import { BoxPVSColourEnum, boxPvsColours, BoxPVSType } from "../model";

export function BoxPVS({
  deleteItem,
  itemObj,
  getItems,
  updateCost,
  openedId,
}: {
  deleteItem: () => void;
  itemObj: ItemType<BoxPVSType>;
  getItems: () => void;
  updateCost: () => void;
  openedId: string;
}) {
  const idb = useContext(IDBContext);
  const [isOpen, setIsOpen] = useState(false);
  const [box, setBox] = useState<BoxPVSType>(itemObj.item);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
    updateCost();
  }, [box]);

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
            initialValue={box.length}
            type="Длина"
            callback={(val) => {
              setBox({
                ...box,
                length: val,
              });
            }}
            minValue={1}
          />
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>Цвет</h5>
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
