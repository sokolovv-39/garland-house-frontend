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
import { useContext, useState, useEffect, useRef } from "react";
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
  const wrapperRef = useRef<HTMLDivElement>(null);

  function updateNeon() {
    idb?.items
      .update<NeonType>({
        ...itemObj,
        item: neon,
      })
      .catch((err) => console.error(err));
  }

  function getNeededPowerUnits(length: number) {
    let needed = Math.ceil(length / 50);
    if (needed > 3 && needed < 10) needed++;
    else if (needed >= 10) needed += 4;
    return needed;
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
            type="Длина, м"
            callback={(val) => {
              let powerUnits = neon.powerUnits;
              const neededPowerUnits = getNeededPowerUnits(val);
              if (powerUnits < neededPowerUnits) powerUnits = neededPowerUnits;
              setNeon({
                ...neon,
                length: val,
                powerUnits,
                ral_meters: val,
              });
            }}
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
            isWithInput={false}
            numberType=""
            val={1}
            type="На стяжки (200 мм)?"
            isActive={neon.isScreeds_200mm}
            callback={(isActive, length) => {
              setNeon({
                ...neon,
                isScreeds_200mm: isActive,
              });
            }}
          />
          <Toggler
            numberType="Длина покраски"
            val={neon.ral_meters}
            type="Покраска профиля"
            isActive={neon.painting}
            callback={(isActive, length) => {
              setNeon({
                ...neon,
                painting: isActive,
                ral_meters: length,
              });
            }}
          />
          {neon.painting && (
            <NumberSelect
              type="Длина непокрашенного профиля, м"
              callback={(val) => {
                setNeon({
                  ...neon,
                  no_ral_meters: val,
                });
              }}
              initialValue={itemObj.item.no_ral_meters}
            />
          )}
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
            type="Соединитель для гибкого неона"
            callback={(val) => {
              let needles = neon.needles;
              const needed = neon.contours + val * 2 + neon.powerUnits;
              if (needles < needed) needles = needed;
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
              if (
                val >=
                neon.extensions_1m * 2 + neon.contours + neon.powerUnits
              )
                setNeon({
                  ...neon,
                  needles: val,
                });
            }}
            initialValue={itemObj.item.needles}
            minValue={
              itemObj.item.extensions_1m * 2 +
              itemObj.item.contours +
              neon.powerUnits
            }
          />
          <NumberSelect
            type="Заглушки, шт"
            callback={(val) => {
              setNeon({
                ...neon,
                plugs: val,
              });
            }}
            initialValue={neon.plugs}
            minValue={1}
          />
          <NumberSelect
            type="Блоки питания, шт"
            callback={(val) => {
              let needles = neon.needles;
              const needed = neon.contours + neon.extensions_1m * 2 + val;
              if (needles < needed) needles = needed;
              setNeon({
                ...neon,
                powerUnits: val,
                needles,
              });
            }}
            initialValue={itemObj.item.powerUnits}
            minValue={getNeededPowerUnits(neon.length)}
          />
          {/*           <NumberSelect
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
          /> */}
        </div>
      )}
    </div>
  );
}
