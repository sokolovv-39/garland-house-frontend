"use client";

import {
  ArrowSVG,
  CloseSVG,
  NumberSelect,
  ItemsAdjust,
  IDBContext,
  Select,
} from "@/fsd/shared";
import classes from "./Curtain.module.scss";
import { useContext, useEffect, useState } from "react";
import {
  CurtainBracingEnum,
  curtainBracings,
  curtainCable,
  CurtainCableEnum,
  CurtainExtensionMultEnum,
  curtainExtensionMults,
  curtainGlowMode,
  CurtainGlowModeEnum,
  CurtainGlowShadeEnum,
  curtainGlowShades,
  CurtainSizeEnum,
  curtainSizes,
  CurtainSurfaceEnum,
  curtainSurfaces,
  CurtainType,
} from "../model";
import { ItemType } from "../../Item";

export function Curtain({
  deleteItem,
  itemObj,
  getItems,
}: {
  deleteItem: () => void;
  itemObj: ItemType<CurtainType>;
  getItems: () => void;
}) {
  const idb = useContext(IDBContext);
  const [isOpen, setIsOpen] = useState(true);
  const [curtain, setCurtain] = useState<CurtainType>(itemObj.item);

  function updateCurtain() {
    idb?.items
      .update<CurtainType>({
        ...itemObj,
        item: curtain,
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    updateCurtain();
    getItems();
  }, [curtain]);

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
          <Select
            type="Длина и ширина изделия"
            values={curtainSizes}
            initialValue={itemObj.item.size}
            littleType
            callback={(val) =>
              setCurtain({
                ...curtain,
                size: val as CurtainSizeEnum,
              })
            }
          />
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>Тип свечения</h5>
            <ItemsAdjust
              list={curtainGlowShades}
              active={itemObj.item.glowShade}
              callback={(val) =>
                setCurtain({
                  ...curtain,
                  glowShade: val as CurtainGlowShadeEnum,
                })
              }
            />
            <ItemsAdjust
              list={curtainGlowMode}
              active={itemObj.item.glowMode}
              callback={(val) =>
                setCurtain({
                  ...curtain,
                  glowMode: val as CurtainGlowModeEnum,
                })
              }
            />
          </div>
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>Цвет кабеля</h5>
            <ItemsAdjust
              list={curtainCable}
              active={itemObj.item.cable}
              callback={(val) =>
                setCurtain({
                  ...curtain,
                  cable: val as CurtainCableEnum,
                })
              }
            />
          </div>
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>Тип крепления</h5>
            <ItemsAdjust
              list={curtainBracings}
              active={itemObj.item.bracing}
              callback={(val) =>
                setCurtain({
                  ...curtain,
                  bracing: val as CurtainBracingEnum,
                })
              }
            />
          </div>
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>Поверхность крепления троса</h5>
            <ItemsAdjust
              list={curtainSurfaces}
              active={itemObj.item.surface}
              callback={(val) =>
                setCurtain({
                  ...curtain,
                  surface: val as CurtainSurfaceEnum,
                })
              }
            />
          </div>
          <Select
            type="Кратность удлинителя"
            littleType
            values={curtainExtensionMults}
            initialValue={itemObj.item.extensionMult}
            callback={(val) =>
              setCurtain({
                ...curtain,
                extensionMult: val as CurtainExtensionMultEnum,
              })
            }
          />
          <NumberSelect
            type="Удлинители, шт"
            initialValue={itemObj.item.extensionQuantity}
            callback={(val) =>
              setCurtain({
                ...curtain,
                extensionQuantity: val,
              })
            }
          />
          <NumberSelect
            type="Тройники, шт"
            initialValue={itemObj.item.teeQuantity}
            callback={(val) =>
              setCurtain({
                ...curtain,
                teeQuantity: val,
              })
            }
          />
        </div>
      )}
    </div>
  );
}
