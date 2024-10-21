"use client";

import Image from "next/image";
import classes from "./Measure.module.scss";
import CopySVG from "./images/copy.svg";
import { MeasureType, PickObject, SelectedObject } from "@/fsd/entities";
import { useEffect, useState, useContext } from "react";
import { Button, CloseSVG, IDBContext, splitPrice } from "@/fsd/shared";
import { ObjectType } from "../../Object";
import { nanoid } from "nanoid";
import { generateRFP } from "@/fsd/features/OrderActions/lib";

export function Measure({
  measure,
  isFavourite,
  deleteMeasure,
  addToFav,
  copyMeasure,
}: {
  measure: MeasureType;
  isFavourite: boolean;
  deleteMeasure: () => void;
  addToFav: () => void;
  copyMeasure: (measure: MeasureType) => void;
}) {
  const idb = useContext(IDBContext);
  const [objects, setObjects] = useState<ObjectType[]>([]);
  const [cost, setCost] = useState("");

  function deleteObject(id: string) {
    idb?.objects
      .getAll()
      .then((objects) => {
        let newObjects = objects.filter((object) => object.id !== id);
        newObjects = newObjects.map((object, index) => {
          return {
            ...object,
            orderId: index + 1,
          };
        });
        idb?.objects
          .rewrite(newObjects)
          .then(() => {
            getObjects();
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => console.error(err));
  }

  function getObjects() {
    idb?.objects
      .getOwn(measure.id)
      .then((data) => {
        function orderIdSort(obj1: ObjectType, obj2: ObjectType) {
          if (obj1.orderId > obj2.orderId) return 1;
          if (obj1.orderId < obj2.orderId) return -1;
          return 0;
        }
        const newObjects = data.sort(orderIdSort);
        setObjects(newObjects);
        updateCost();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function addObject(variant: string) {
    const orderId = objects.length
      ? objects[objects.length - 1].orderId + 1
      : 1;

    const newObject: ObjectType = {
      id: nanoid(),
      orderId,
      media: null,
      title: variant,
      measureId: measure.id,
    };

    idb?.objects
      .add(newObject)
      .then(() => getObjects())
      .catch((err) => {
        console.error(err);
      });
  }

  function updateCost() {
    console.log("updating cost...");
    generateRFP(idb!, measure.id, false).then((overall) => {
      console.log(`new cost ${overall}`);
      setCost(splitPrice(overall!));
    });
  }

  async function updateObjectName(obj: ObjectType) {
    await idb?.objects.update(obj);
    getObjects();
  }

  useEffect(() => {
    getObjects();
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes.left}>
          <h2 className={classes.measureId}>#{measure.orderId}</h2>
          <svg
            onClick={() => addToFav()}
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              cursor: "pointer",
            }}
          >
            <g opacity={isFavourite ? "1" : "0.5"}>
              <path
                d="M16.0187 4.095L18.072 8.20167C18.352 8.77334 19.0987 9.32167 19.7287 9.42667L23.4504 10.045C25.8304 10.4417 26.3904 12.1683 24.6754 13.8717L21.782 16.765C21.292 17.255 21.0237 18.2 21.1754 18.8767L22.0037 22.4583C22.657 25.2933 21.152 26.39 18.6437 24.9083L15.1554 22.8433C14.5254 22.47 13.487 22.47 12.8454 22.8433L9.35705 24.9083C6.86038 26.39 5.34372 25.2817 5.99705 22.4583L6.82538 18.8767C6.97705 18.2 6.70872 17.255 6.21872 16.765L3.32538 13.8717C1.62205 12.1683 2.17038 10.4417 4.55038 10.045L8.27205 9.42667C8.89038 9.32167 9.63705 8.77334 9.91705 8.20167L11.9704 4.095C13.0904 1.86667 14.9104 1.86667 16.0187 4.095Z"
                fill={isFavourite ? "#C59B68" : "#FFFFFF"}
                stroke={isFavourite ? "" : "#A9A9A9"}
                strokeWidth={isFavourite ? "" : "1.5"}
              />
            </g>
          </svg>
          <Image
            src={CopySVG}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={() => copyMeasure(measure)}
          />
        </div>
        <div className={classes.right}>
          <span className={classes.price}>{cost}</span>
          <CloseSVG onClick={() => deleteMeasure()} />
        </div>
      </div>
      <div className={classes.objectsWrapper}>
        {objects.map((obj, i) => (
          <SelectedObject
            updateObject={updateObjectName}
            updateCost={updateCost}
            object={obj}
            key={i}
            deleteObject={() => deleteObject(obj.id)}
          />
        ))}
      </div>
      <PickObject addObject={(variant) => addObject(variant)} />
      <Button type="button" click={() => generateRFP(idb!, measure.id)}>
        Скачать КП
      </Button>
    </div>
  );
}
