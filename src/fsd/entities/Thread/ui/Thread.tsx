"use client";

import {
  ArrowSVG,
  CloseSVG,
  NumberSelect,
  ItemsAdjust,
  IDBContext,
  Select,
  Toggler,
} from "@/fsd/shared";
import classes from "./Thread.module.scss";
import { useContext, useEffect, useState } from "react";
import {
  ThreadType,
  threadGlowShades,
  ThreadGlowShadeEnum,
  threadGlowMode,
  ThreadGlowModeEnum,
  threadBracings,
  ThreadBracingEnum,
  threadSurfaces,
  ThreadSurfaceEnum,
  threadScreedTypes,
  ThreadScreedsTypeEnum,
} from "../model";
import { ItemType } from "../../Item";
import { threadCables } from "../model/defaults";
import { PVSColorEnum } from "../../PVS";
import { tree } from "next/dist/build/templates/app-page";

export function Thread({
  deleteItem,
  itemObj,
  getItems,
  updateCost,
  openedId,
}: {
  deleteItem: () => void;
  itemObj: ItemType<ThreadType>;
  getItems: () => void;
  updateCost: () => void;
  openedId: string;
}) {
  const idb = useContext(IDBContext);
  const [isOpen, setIsOpen] = useState(false);
  const [thread, setThread] = useState<ThreadType>(itemObj.item);

  function updateThread() {
    idb?.items
      .update<ThreadType>({
        ...itemObj,
        item: thread,
      })
      .catch((err) => console.error(err));
  }

  function getNeededPowerUnits(length: number) {
    let needed = Math.ceil(length / 100);
    if (needed > 3 && needed < 10) needed++;
    else if (needed >= 10) needed += 4;
    return needed;
  }

  useEffect(() => {
    updateThread();
    getItems();
    updateCost();
  }, [thread]);

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
            <span>
              {itemObj.item.length} м
              {thread.tree.isActive
                ? `. На дерево высотой ${thread.tree.height} м`
                : ""}
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
            type="Длина, м"
            callback={(val) => {
              let powerUnits = thread.powerUnits;
              const needed = getNeededPowerUnits(val);
              if (powerUnits < needed) powerUnits = needed;
              setThread({
                ...thread,
                length: val,
                powerUnits,
              });
            }}
            initialValue={itemObj.item.length}
          />
          <Toggler
            numberType="Высота дерева, м"
            type="Для дерева?"
            val={thread.tree.height}
            isActive={thread.tree.isActive}
            callback={(isActive, val) => {
              setThread({
                ...thread,
                tree: {
                  ...thread.tree,
                  isActive,
                  height: val,
                },
              });
            }}
          />
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>Тип свечения</h5>
            <Select
              type="Оттенок"
              values={threadGlowShades}
              initialValue={itemObj.item.glowShade}
              callback={(val) =>
                setThread({
                  ...thread,
                  glowShade: val as ThreadGlowShadeEnum,
                })
              }
            />
            <ItemsAdjust
              list={threadGlowMode}
              active={itemObj.item.glowMode}
              callback={(val) =>
                setThread({
                  ...thread,
                  glowMode: val as ThreadGlowModeEnum,
                })
              }
            />
          </div>
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>Цвет провода</h5>
            <ItemsAdjust
              list={threadCables}
              active={itemObj.item.cable}
              callback={(val) =>
                setThread({
                  ...thread,
                  cable: val as PVSColorEnum,
                })
              }
            />
          </div>
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>Тип крепления</h5>
            <ItemsAdjust
              list={threadBracings}
              active={itemObj.item.bracing}
              callback={(val) =>
                setThread({
                  ...thread,
                  bracing: val as ThreadBracingEnum,
                })
              }
            />
          </div>
          {thread.bracing === ThreadBracingEnum.Rope && (
            <div className={classes.tabs}>
              <h5 className={classes.tabsTitle}>Поверхность крепления</h5>
              <ItemsAdjust
                list={threadSurfaces}
                active={itemObj.item.surface}
                callback={(val) =>
                  setThread({
                    ...thread,
                    surface: val as ThreadSurfaceEnum,
                  })
                }
              />
            </div>
          )}
          {thread.bracing === ThreadBracingEnum.Screeds && (
            <div className={classes.tabs}>
              <h5 className={classes.tabsTitle}>Тип стяжек</h5>
              <ItemsAdjust
                list={threadScreedTypes}
                active={itemObj.item.screedsType}
                callback={(val) =>
                  setThread({
                    ...thread,
                    screedsType: val as ThreadScreedsTypeEnum,
                  })
                }
              />
            </div>
          )}
          <NumberSelect
            type="Удлинители, 1м"
            callback={(val) =>
              setThread({
                ...thread,
                extensions_1m: val,
              })
            }
            initialValue={itemObj.item.extensions_1m}
          />
          <NumberSelect
            type="Удлинители, 3м"
            callback={(val) =>
              setThread({
                ...thread,
                extensions_3m: val,
              })
            }
            initialValue={itemObj.item.extensions_3m}
          />
          <NumberSelect
            type="Удлинители, 5м"
            callback={(val) =>
              setThread({
                ...thread,
                extensions_5m: val,
              })
            }
            initialValue={itemObj.item.extensions_5m}
          />
          <NumberSelect
            type="Удлинители, 10м"
            callback={(val) =>
              setThread({
                ...thread,
                extensions_10m: val,
              })
            }
            initialValue={itemObj.item.extensions_10m}
          />
          {/* <NumberSelect
            type="Количество контуров"
            callback={(val) => {
              let powerUnits = thread.powerUnits;
              if (powerUnits < val) {
                powerUnits = val;
              }
              setThread({
                ...thread,
                contours: val,
                powerUnits,
              });
            }}
            initialValue={itemObj.item.contours}
            minValue={1}
          /> */}
          <NumberSelect
            type="Блоки питания, шт"
            callback={(val) => {
              setThread({
                ...thread,
                powerUnits: val,
              });
            }}
            initialValue={itemObj.item.powerUnits}
            minValue={getNeededPowerUnits(thread.length)}
          />
          <NumberSelect
            type="Тройники, шт"
            initialValue={itemObj.item.tees}
            callback={(val) =>
              setThread({
                ...thread,
                tees: val,
              })
            }
          />
        </div>
      )}
    </div>
  );
}
