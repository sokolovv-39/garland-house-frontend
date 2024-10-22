"use client";

import {
  ArrowSVG,
  CloseSVG,
  NumberSelect,
  ItemsAdjust,
  IDBContext,
  Select,
  Toggler,
  Input,
} from "@/fsd/shared";
import classes from "./Neon.module.scss";
import { useContext, useState, useEffect } from "react";
import { ItemType } from "../../Item";
import {
  neonGlowShade,
  NeonGlowShadeEnum,
  neonThickness,
  NeonThicknessEnum,
  NeonType,
} from "../model";

export function Neon({
  deleteItem,
  itemObj,
  getItems,
  updateCost,
  openedId,
}: {
  deleteItem: () => void;
  itemObj: ItemType<NeonType>;
  getItems: () => void;
  updateCost: () => void;
  openedId: string;
}) {
  const idb = useContext(IDBContext);
  const [isOpen, setIsOpen] = useState(false);
  const [neon, setNeon] = useState<NeonType>(itemObj.item);

  function updateNeon() {
    idb?.items
      .update<NeonType>({
        ...itemObj,
        item: neon,
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    updateNeon();
    getItems();
    updateCost();
  }, [neon]);

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
              setNeon({
                ...neon,
                length: val,
              })
            }
            initialValue={itemObj.item.length}
          />
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>Тип свечения</h5>
            <Select
              type="Тип свечения"
              values={neonGlowShade}
              initialValue={itemObj.item.glowShade}
              callback={(val) =>
                setNeon({
                  ...neon,
                  glowShade: val as NeonGlowShadeEnum,
                })
              }
            />
          </div>
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>Толщина</h5>
            <ItemsAdjust
              list={neonThickness}
              active={itemObj.item.thickness}
              callback={(val) =>
                setNeon({
                  ...neon,
                  thickness: val as NeonThicknessEnum,
                })
              }
            />
          </div>
          <Toggler
            type="Покраска профиля"
            isActive={neon.painting}
            callback={(isActive) => {
              setNeon({
                ...neon,
                painting: isActive,
              });
            }}
          />
          {neon.painting && (
            <div className={classes.tabs}>
              <h5 className={classes.tabsTitle}>Номер RAL</h5>
              <Input
                initialValue={neon.ral}
                type="text"
                placeholder="RAL"
                onChange={(val) => {
                  setNeon({
                    ...neon,
                    ral: val,
                  });
                }}
              />
            </div>
          )}
          <NumberSelect
            type="Удлинители, 1м"
            callback={(val) => {
              let needles = 0;
              if (neon.needles < val * 2 + neon.contours)
                needles = val * 2 + neon.contours;
              else needles = neon.needles;
              setNeon({
                ...neon,
                extensions_1m: val,
                needles,
              });
            }}
            initialValue={itemObj.item.extensions_1m}
          />
          <NumberSelect
            type="Соединительные иглы, шт"
            callback={(val) => {
              if (val >= neon.extensions_1m * 2 + neon.contours)
                setNeon({
                  ...neon,
                  needles: val,
                });
            }}
            initialValue={itemObj.item.needles}
            minValue={itemObj.item.extensions_1m * 2 + itemObj.item.contours}
          />
          <NumberSelect
            type="Блоки питания, шт"
            callback={(val) => {
              if (val >= neon.contours)
                setNeon({
                  ...neon,
                  powerUnits: val,
                });
            }}
            initialValue={itemObj.item.powerUnits}
            minValue={itemObj.item.contours}
          />
          <NumberSelect
            type="Количество контуров, шт"
            callback={(val) => {
              let powerUnits = neon.powerUnits;
              if (powerUnits < val) {
                powerUnits = val;
              }
              let needles = 0;
              if (neon.needles < val + neon.extensions_1m * 2)
                needles = val + neon.extensions_1m * 2;
              else needles = neon.needles;
              setNeon({
                ...neon,
                contours: val,
                powerUnits,
                needles,
              });
            }}
            initialValue={itemObj.item.contours}
            minValue={1}
          />
        </div>
      )}
    </div>
  );
}
