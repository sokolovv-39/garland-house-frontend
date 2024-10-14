"use client";

import { Measure, MeasureType } from "@/fsd/entities";
import classes from "./AllMeasures.module.scss";
import { useContext, useEffect, useState } from "react";
import { IDBContext } from "@/fsd/shared";
import { nanoid } from "nanoid";

export function AllMeasures({ numberOfOrder }: { numberOfOrder: number }) {
  const idb = useContext(IDBContext);
  const [measures, setMeasures] = useState<MeasureType[]>([]);

  function getMeasures() {
    idb?.measures
      .getOwn(numberOfOrder)
      .then((data) => {
        function orderIdSort(obj1: MeasureType, obj2: MeasureType) {
          if (obj1.orderId > obj2.orderId) return 1;
          if (obj1.orderId < obj2.orderId) return -1;
          return 0;
        }
        const newMeasures = data.sort(orderIdSort);
        setMeasures(newMeasures);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function deleteMeasure(id: string) {
    idb?.measures
      .delete(id)
      .then(() => {
        getMeasures();
      })
      .catch((err) => console.error(err));
  }

  function addMeasure() {
    const orderId = measures.length
      ? measures[measures.length - 1].orderId + 1
      : 1;

    const newMeasure: MeasureType = {
      id: nanoid(),
      orderId,
      objectIds: [],
      isFavourite: orderId === 1,
      ownOrder: numberOfOrder,
    };

    idb?.measures
      .add(newMeasure)
      .then(() => getMeasures())
      .catch((err) => {
        console.error(err);
      });
  }

  function addToFav(id: string) {
    idb?.measures
      .getOwn(numberOfOrder)
      .then((measures) => {
        return new Promise<void>((resolve, reject) => {
          measures.forEach(async (measure, index) => {
            try {
              await idb.measures.update({
                ...measure,
                isFavourite: measure.id === id,
              });
              if (index === measures.length - 1) resolve();
            } catch (err) {
              reject(err);
            }
          });
        })
          .then(() => getMeasures())
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getMeasures();
  }, []);

  return (
    <div className={classes.wrapper}>
      {measures.map((measure) => (
        <Measure
          addToFav={() => addToFav(measure.id)}
          measure={measure}
          isFavourite={measure.isFavourite}
          key={measure.id}
          deleteMeasure={() => deleteMeasure(measure.id)}
        />
      ))}
      <div className={classes.addMeasure} onClick={() => addMeasure()}>
        <span>Добавить вариант замера</span>
      </div>
    </div>
  );
}
