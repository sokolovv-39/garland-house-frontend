"use client";

import { ArrowSVG, CloseSVG, NumberSelect, IDBContext } from "@/fsd/shared";
import classes from "./RelaysSwitches.module.scss";
import { useContext, useEffect, useState } from "react";
import { ItemType } from "../../Item";
import { RelaysSwitchesType } from "../model";

export function RelaysSwitches({
  deleteItem,
  itemObj,
  getItems,
  updateCost,
  openedId,
}: {
  deleteItem: () => void;
  itemObj: ItemType<RelaysSwitchesType>;
  getItems: () => void;
  updateCost: () => void;
  openedId: string;
}) {
  const idb = useContext(IDBContext);
  const [isOpen, setIsOpen] = useState(false);
  const [switches, setSwitches] = useState<RelaysSwitchesType>(itemObj.item);

  function updateSwitches() {
    idb?.items
      .update<RelaysSwitchesType>({
        ...itemObj,
        item: switches,
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    updateSwitches();
    getItems();
    updateCost();
  }, [switches]);

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
            type="Обычный проводной выключатель, шт"
            initialValue={itemObj.item.wired}
            callback={(val) =>
              setSwitches({
                ...switches,
                wired: val,
              })
            }
          />
          <NumberSelect
            type="Бес. радио выкл. с радио реле"
            initialValue={itemObj.item.wirelessRadio}
            callback={(val) =>
              setSwitches({
                ...switches,
                wirelessRadio: val,
              })
            }
          />
          <NumberSelect
            type="Бес. радио выкл. с wi-fi реле "
            initialValue={itemObj.item.wirelessWifi}
            callback={(val) =>
              setSwitches({
                ...switches,
                wirelessWifi: val,
              })
            }
          />
          <NumberSelect
            type="Астрономическое реле времени"
            initialValue={itemObj.item.astroRelay}
            callback={(val) =>
              setSwitches({
                ...switches,
                astroRelay: val,
              })
            }
          />
        </div>
      )}
    </div>
  );
}
