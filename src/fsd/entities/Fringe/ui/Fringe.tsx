"use client";

import {
  ArrowSVG,
  CloseSVG,
  NumberSelect,
  ItemsAdjust,
  IDBContext,
  Select,
} from "@/fsd/shared";
import classes from "./Fringe.module.scss";
import { useContext, useEffect, useState } from "react";
import {
  FringeBracingEnum,
  fringeBracings,
  FringeCableEnum,
  fringeCables,
  FringeType,
  FringeGlowModeEnum,
  fringeGlowModes,
  FringeGlowShadeEnum,
  fringeGlowShades,
  fringeLeds,
  FringeLedEnum,
  fringeSurfaces,
  FringeSurfaceEnum,
  fringeMultiplicities,
  FringeMultiplicityEnum,
} from "../model";
import { ItemType } from "../../Item";

export function Fringe({
  deleteItem,
  itemObj,
  updateCost,
  getItems,
  openedId,
}: {
  deleteItem: () => void;
  itemObj: ItemType<FringeType>;
  getItems: () => void;
  updateCost: () => void;
  openedId: string;
}) {
  const idb = useContext(IDBContext);
  const [isOpen, setIsOpen] = useState(false);
  const [fringe, setFringe] = useState<FringeType>(itemObj.item);

  function updateFringe() {
    idb?.items
      .update<FringeType>({
        ...itemObj,
        item: fringe,
      })
      .catch((err) => console.error(err));
  }

  function getNeededPowerUnits(length: number) {
    let needed = Math.ceil(length / 25);
    if (needed > 3 && needed < 10) needed++;
    else if (needed >= 10) needed += 4;
    return needed;
  }

  useEffect(() => {
    updateFringe();
    getItems();
    updateCost();
  }, [fringe]);

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
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>Кратность</h5>
            <ItemsAdjust
              list={fringeMultiplicities}
              active={itemObj.item.multiplicity}
              callback={(val) =>
                setFringe({
                  ...fringe,
                  multiplicity: val as FringeMultiplicityEnum,
                })
              }
            />
          </div>
          <NumberSelect
            type="Длина, м"
            callback={(val) => {
              let powerUnits = fringe.powerUnits;
              const neededPowerUnits = getNeededPowerUnits(val);
              if (powerUnits < neededPowerUnits) powerUnits = neededPowerUnits;
              setFringe({
                ...fringe,
                length: val,
                powerUnits,
              });
            }}
            initialValue={itemObj.item.length}
          />
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>Тип свечения</h5>
            <ItemsAdjust
              list={fringeGlowShades}
              active={itemObj.item.glowShade}
              callback={(val) =>
                setFringe({
                  ...fringe,
                  glowShade: val as FringeGlowShadeEnum,
                })
              }
            />
            <ItemsAdjust
              list={fringeGlowModes}
              active={itemObj.item.glowMode}
              callback={(val) =>
                setFringe({
                  ...fringe,
                  glowMode: val as FringeGlowModeEnum,
                })
              }
            />
          </div>
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>Цвет провода</h5>
            <ItemsAdjust
              list={fringeCables}
              active={itemObj.item.cable}
              callback={(val) =>
                setFringe({
                  ...fringe,
                  cable: val as FringeCableEnum,
                })
              }
            />
          </div>
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>Тип крепления</h5>
            <ItemsAdjust
              list={fringeBracings}
              active={itemObj.item.bracing}
              callback={(val) =>
                setFringe({
                  ...fringe,
                  bracing: val as FringeBracingEnum,
                })
              }
            />
          </div>
          {fringe.bracing === "Трос" && (
            <div className={classes.tabs}>
              <h5 className={classes.tabsTitle}>Поверхность крепления</h5>
              <ItemsAdjust
                list={fringeSurfaces}
                active={itemObj.item.surface}
                callback={(val) =>
                  setFringe({
                    ...fringe,
                    surface: val as FringeSurfaceEnum,
                  })
                }
              />
            </div>
          )}
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>LED</h5>
            <ItemsAdjust
              list={fringeLeds}
              active={itemObj.item.led}
              callback={(val) =>
                setFringe({
                  ...fringe,
                  led: val as FringeLedEnum,
                })
              }
            />
          </div>
          <NumberSelect
            type="Удлинители, 1м"
            callback={(val) =>
              setFringe({
                ...fringe,
                extensions_1m: val,
              })
            }
            initialValue={itemObj.item.extensions_1m}
          />
          <NumberSelect
            type="Удлинители, 3м"
            callback={(val) =>
              setFringe({
                ...fringe,
                extensions_3m: val,
              })
            }
            initialValue={itemObj.item.extensions_3m}
          />
          <NumberSelect
            type="Удлинители, 5м"
            callback={(val) =>
              setFringe({
                ...fringe,
                extensions_5m: val,
              })
            }
            initialValue={itemObj.item.extensions_5m}
          />
          <NumberSelect
            type="Удлинители, 10м"
            callback={(val) =>
              setFringe({
                ...fringe,
                extensions_10m: val,
              })
            }
            initialValue={itemObj.item.extensions_10m}
          />
          <NumberSelect
            type="Тройники, шт"
            callback={(val) =>
              setFringe({
                ...fringe,
                tees: val,
              })
            }
            initialValue={itemObj.item.tees}
          />
          <NumberSelect
            type="Блоки питания, шт"
            callback={(val) => {
              setFringe({
                ...fringe,
                powerUnits: val,
              });
            }}
            initialValue={itemObj.item.powerUnits}
            minValue={getNeededPowerUnits(fringe.length)}
          />
          {/*           <NumberSelect
            type="Количество контуров"
            callback={(val) => {
              let powerUnits = fringe.powerUnits;
              if (powerUnits < val) {
                powerUnits = val;
              }
              setFringe({
                ...fringe,
                contours: val,
                powerUnits,
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
