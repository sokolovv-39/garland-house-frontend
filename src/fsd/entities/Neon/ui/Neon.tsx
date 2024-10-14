"use client";

import {
  ArrowSVG,
  CloseSVG,
  NumberSelect,
  ItemsAdjust,
  IDBContext,
  Select,
} from "@/fsd/shared";
import classes from "./Neon.module.scss";
import { useContext, useState, useEffect } from "react";
import { ItemType } from "../../Item";
import {
  neonBracing,
  NeonBracingEnum,
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
}: {
  deleteItem: () => void;
  itemObj: ItemType<NeonType>;
  getItems: () => void;
}) {
  const idb = useContext(IDBContext);
  const [isOpen, setIsOpen] = useState(true);
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
  }, [neon]);

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
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>
              Крепление с помощью металлического профиля
            </h5>
            <ItemsAdjust
              list={neonBracing}
              active={itemObj.item.bracing}
              callback={(val) =>
                setNeon({
                  ...neon,
                  bracing: val as NeonBracingEnum,
                })
              }
            />
          </div>
          <NumberSelect
            type="Удлинители, шт"
            callback={(val) =>
              setNeon({
                ...neon,
                extensionQuantity: val,
              })
            }
            initialValue={itemObj.item.extensionQuantity}
          />
          <NumberSelect
            type="Соединительные иглы, шт"
            callback={(val) =>
              setNeon({
                ...neon,
                needles: val,
              })
            }
            initialValue={itemObj.item.needles}
          />
          <NumberSelect
            type="Блоки питания, шт"
            callback={(val) =>
              setNeon({
                ...neon,
                powerQuantity: val,
              })
            }
            initialValue={itemObj.item.powerQuantity}
          />
          <NumberSelect
            type="Количество контуров, шт"
            callback={(val) =>
              setNeon({
                ...neon,
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
