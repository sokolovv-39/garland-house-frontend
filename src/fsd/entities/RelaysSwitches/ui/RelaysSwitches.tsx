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
          {!isOpen && (
            <span>
              {itemObj.item.wireless_1 +
                itemObj.item.wireless_2 +
                itemObj.item.wireless_3 +
                itemObj.item.wireless_1_wifi +
                itemObj.item.wireless_2_wifi +
                itemObj.item.wireless_3_wifi +
                itemObj.item.astroRelay +
                itemObj.item.photoRelay}{" "}
              шт
            </span>
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
            type="Обычный 1-клавишный, шт"
            initialValue={itemObj.item.default_1}
            callback={(val) =>
              setSwitches({
                ...switches,
                default_1: val,
              })
            }
          />
          <NumberSelect
            type="Обычный 2-клавишный, шт"
            initialValue={itemObj.item.default_2}
            callback={(val) =>
              setSwitches({
                ...switches,
                default_2: val,
              })
            }
          />
          <NumberSelect
            type="Беспроводной 1-клавишный, шт"
            initialValue={itemObj.item.wireless_1}
            callback={(val) =>
              setSwitches({
                ...switches,
                wireless_1: val,
              })
            }
          />
          <NumberSelect
            type="Беспроводной 2-клавишный, шт"
            initialValue={itemObj.item.wireless_2}
            callback={(val) =>
              setSwitches({
                ...switches,
                wireless_2: val,
              })
            }
          />
          <NumberSelect
            type="Беспроводной 3-клавишный, шт"
            initialValue={itemObj.item.wireless_3}
            callback={(val) =>
              setSwitches({
                ...switches,
                wireless_3: val,
              })
            }
          />
          <NumberSelect
            type="Беспроводной 1-клавишный WIFI, шт"
            initialValue={itemObj.item.wireless_1_wifi}
            callback={(val) =>
              setSwitches({
                ...switches,
                wireless_1_wifi: val,
              })
            }
          />
          <NumberSelect
            type="Беспроводной 2-клавишный WIFI, шт"
            initialValue={itemObj.item.wireless_2_wifi}
            callback={(val) =>
              setSwitches({
                ...switches,
                wireless_2_wifi: val,
              })
            }
          />
          <NumberSelect
            type="Беспроводной 3-клавишный WIFI, шт"
            initialValue={itemObj.item.wireless_3_wifi}
            callback={(val) =>
              setSwitches({
                ...switches,
                wireless_3_wifi: val,
              })
            }
          />
          <NumberSelect
            type="Фотореле, шт"
            initialValue={itemObj.item.photoRelay}
            callback={(val) =>
              setSwitches({
                ...switches,
                photoRelay: val,
              })
            }
          />
          <NumberSelect
            type="Астрономическое реле, шт"
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
