"use client";

import {
  ArrowSVG,
  CloseSVG,
  NumberSelect,
  ItemsAdjust,
  IDBContext,
} from "@/fsd/shared";
import classes from "./Rope.module.scss";
import { useContext, useEffect, useState } from "react";
import {
  RopeSurfaceEnum,
  ropeSurfaces,
  ropeThicknessDefault,
  RopeThicknessEnum,
  RopeType,
} from "../model";
import { ItemType } from "../../Item";

export function Rope({
  deleteItem,
  itemObj,
  updateCost,
  openedId,
  meters,
}: {
  deleteItem: () => void;
  itemObj: ItemType<RopeType>;
  getItems: () => void;
  updateCost: () => void;
  openedId: string;
  meters: number;
}) {
  const idb = useContext(IDBContext);
  const [isOpen, setIsOpen] = useState(false);
  const [rope, setRope] = useState<RopeType>(itemObj.item);

  function updateRope() {
    idb?.items
      .update<RopeType>({
        ...itemObj,
        item: rope,
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    updateRope();
    updateCost();
  }, [rope]);

  useEffect(() => {
    setIsOpen(openedId === itemObj.id);
  }, [openedId]);

  useEffect(() => {
    window.scrollTo({
      top: 400,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    console.log("use effect", meters);
    setRope({
      ...rope,
      length: Math.ceil(meters),
    });
  }, [meters]);

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
          {!isOpen && <span>{itemObj.item.length} м</span>}
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
            initialValue={itemObj.item.length}
            callback={(val) =>
              setRope({
                ...rope,
                length: val,
              })
            }
          />
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>Толщина изделия</h5>
            <ItemsAdjust
              list={ropeThicknessDefault}
              active={itemObj.item.thickness}
              callback={(val) =>
                setRope({
                  ...rope,
                  thickness: val as RopeThicknessEnum,
                })
              }
            />
          </div>
          <div className={classes.tabs}>
            <h5 className={classes.tabsTitle}>Поверхность крепления</h5>
            <ItemsAdjust
              list={ropeSurfaces}
              active={itemObj.item.surface}
              callback={(val) =>
                setRope({
                  ...rope,
                  surface: val as RopeSurfaceEnum,
                })
              }
            />
          </div>
          <NumberSelect
            type="Количество контуров, шт"
            callback={(val) =>
              setRope({
                ...rope,
                contours: val,
              })
            }
            initialValue={itemObj.item.contours}
            minValue={1}
          />
        </div>
      )}
    </div>
  );
}
