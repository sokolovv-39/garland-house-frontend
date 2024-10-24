"use client";

import {
  ArrowSVG,
  CloseSVG,
  NumberSelect,
  ItemsAdjust,
  IDBContext,
  Select,
} from "@/fsd/shared";
import classes from "./BeltLight.module.scss";
import { useContext, useState, useEffect } from "react";
import { ItemType } from "../../Item";
import {
  beltLightCables,
  BeltLightGlowShadeEnum,
  beltLightGlowShades,
  BeltLightLampStepEnum,
  beltLightLampSteps,
  BeltLightType,
} from "../model";
import { PVSColorEnum } from "../../PVS";

export function BeltLight({
  deleteItem,
  itemObj,
  getItems,
  updateCost,
  openedId,
}: {
  deleteItem: () => void;
  itemObj: ItemType<BeltLightType>;
  getItems: () => void;
  updateCost: () => void;
  openedId: string;
}) {
  const idb = useContext(IDBContext);
  const [isOpen, setIsOpen] = useState(false);
  const [beltLight, setBeltLight] = useState<BeltLightType>(itemObj.item);

  function updateBeltLight() {
    idb?.items
      .update<BeltLightType>({
        ...itemObj,
        item: beltLight,
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    updateBeltLight();
    getItems();
    updateCost();
  }, [beltLight]);

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
              setBeltLight({
                ...beltLight,
                length: val,
              })
            }
            initialValue={itemObj.item.length}
          />
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>Цветовое сочетание</h5>
            <Select
              type="Цветовое сочетание"
              values={beltLightGlowShades}
              initialValue={itemObj.item.glowShade}
              callback={(val) =>
                setBeltLight({
                  ...beltLight,
                  glowShade: val as BeltLightGlowShadeEnum,
                })
              }
            />
          </div>
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>Шаг между цоколями ламп</h5>
            <ItemsAdjust
              list={beltLightLampSteps}
              active={itemObj.item.lampStep}
              callback={(val) =>
                setBeltLight({
                  ...beltLight,
                  lampStep: val as BeltLightLampStepEnum,
                })
              }
            />
          </div>
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>Цвет провода</h5>
            <ItemsAdjust
              list={beltLightCables}
              active={itemObj.item.cable}
              callback={(val) =>
                setBeltLight({
                  ...beltLight,
                  cable: val as PVSColorEnum,
                })
              }
            />
          </div>
          <NumberSelect
            type="Удлинитель, кол-во метров кабеля ПВС"
            callback={(val) =>
              setBeltLight({
                ...beltLight,
                pvsLength: val,
              })
            }
            initialValue={itemObj.item.pvsLength}
          />
          {/* <NumberSelect
            type="Количество контуров"
            callback={(val) => {
              if (val)
                setBeltLight({
                  ...beltLight,
                  contours: val,
                });
            }}
            initialValue={itemObj.item.contours}
            minValue={1}
          /> */}
        </div>
      )}
    </div>
  );
}
