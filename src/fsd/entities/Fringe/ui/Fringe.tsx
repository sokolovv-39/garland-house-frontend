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
  fringeExtMults,
  FringeExtensionMultEnum,
  fringeTeeColour,
  FringeTeeColourEnum,
  fringeLeds,
  FringeLedEnum,
  fringeSurfaces,
  FringeSurfaceEnum,
  fringeExtensionColor,
  FringeExtensionColorEnum,
} from "../model";
import { ItemType } from "../../Item";

export function Fringe({
  deleteItem,
  itemObj,
  getItems,
}: {
  deleteItem: () => void;
  itemObj: ItemType<FringeType>;
  getItems: () => void;
}) {
  const idb = useContext(IDBContext);
  const [isOpen, setIsOpen] = useState(true);
  const [fringe, setFringe] = useState<FringeType>(itemObj.item);
  let initialPowers = itemObj.item.contours

  function updateFringe() {
    idb?.items
      .update<FringeType>({
        ...itemObj,
        item: fringe,
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    updateFringe();
    getItems();
  }, [fringe]);

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
              setFringe({
                ...fringe,
                length: val,
              })
            }
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
            <h5 className={classes.tabsTitle}>Цвет кабеля</h5>
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
          <Select
            type="Кратность удлинителя"
            values={fringeExtMults}
            initialValue={itemObj.item.extensionMult}
            littleType
            callback={(val) =>
              setFringe({
                ...fringe,
                extensionMult: val as FringeExtensionMultEnum,
              })
            }
          />
          <NumberSelect
            type="Удлинители, шт"
            callback={(val) =>
              setFringe({
                ...fringe,
                extensionQuantity: val,
              })
            }
            initialValue={itemObj.item.extensionQuantity}
          />
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>Цвет удлинителей</h5>
            <ItemsAdjust
              list={fringeExtensionColor}
              active={itemObj.item.extensionColor}
              callback={(val) =>
                setFringe({
                  ...fringe,
                  extensionColor: val as FringeExtensionColorEnum,
                })
              }
            />
          </div>
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>Цвет тройников</h5>
            <ItemsAdjust
              list={fringeTeeColour}
              active={itemObj.item.teeColour}
              callback={(val) =>
                setFringe({
                  ...fringe,
                  teeColour: val as FringeTeeColourEnum,
                })
              }
            />
          </div>
          <NumberSelect
            type="Тройники, шт"
            callback={(val) =>
              setFringe({
                ...fringe,
                teeQuantity: val,
              })
            }
            initialValue={itemObj.item.teeQuantity}
          />
          <NumberSelect
            type="Блоки питания, шт"
            callback={(val) =>
              setFringe({
                ...fringe,
                powerQuantity: val,
              })
            }
            initialValue={itemObj.item.powerQuantity}
          />
          <NumberSelect
            type="Количество контуров"
            callback={(val) =>
              setFringe({
                ...fringe,
                contours: val,
              })
            }
            initialValue={itemObj.item.contours}
          />
        </div>
      )}
    </div>
  );
}
