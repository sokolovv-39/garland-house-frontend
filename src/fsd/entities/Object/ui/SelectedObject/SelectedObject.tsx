"use client";

import { CloseSVG, IDBContext } from "@/fsd/shared";
import classes from "./SelectedObject.module.scss";
import {
  Fringe,
  ItemType,
  PickItem,
  NoMedia,
  defaultFringe,
  CommonItemType,
  FringeType,
  Neon,
  ItemTitleType,
  ThreadType,
  defaultThread,
  Thread,
  BeltLightType,
  beltLightDefault,
  BeltLight,
  CurtainType,
  curtainDefault,
  AllItemsTypes,
  Curtain,
  RopeType,
  ropeDefault,
  Rope,
  PVSType,
  pvsDefault,
  PVS,
  CorrugationType,
  corrugationDefault,
  CorrugationPVS,
  BoxPVSType,
  boxPvsDefault,
  BoxPVS,
  SolderBoxType,
  solderBoxDefault,
  SolderBox,
  RelaysSwitchesType,
  relaysSwitchesDefault,
  RelaysSwitches,
  VagiType,
  vagiDefault,
  Vagi,
  Screed_480_500_Type,
  Screed_480_500_default,
  Screed_480_500,
  Screed_200_Type,
  screed_200_default,
  Screed_200,
} from "@/fsd/entities";
import { useState, useContext, useEffect } from "react";
import { ObjectType } from "../../model";
import { nanoid } from "nanoid";
import { defaultNeon, NeonType } from "@/fsd/entities/Neon/model";

export function SelectedObject({
  object,
  deleteObject,
}: {
  object: ObjectType;
  deleteObject: () => void;
}) {
  const [items, setItems] = useState<CommonItemType[]>([]);
  const idb = useContext(IDBContext);

  function getItems() {
    idb?.items
      .getOwn(object.id)
      .then((data) => {
        function orderIdSort(obj1: CommonItemType, obj2: CommonItemType) {
          if (obj1.orderId > obj2.orderId) return 1;
          if (obj1.orderId < obj2.orderId) return -1;
          return 0;
        }
        const newItems = data.sort(orderIdSort);
        setItems(newItems);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function deleteItem(id: string) {
    idb?.items
      .getAll()
      .then((items) => {
        let newItems = items.filter((item) => item.id !== id);
        newItems = newItems.map((item, index) => {
          return {
            ...item,
            orderId: index + 1,
          };
        });
        idb?.items
          .rewrite(newItems)
          .then(() => {
            getItems();
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => console.error(err));
  }

  function addItem(itemTitle: string) {
    const orderId = items.length ? items[items.length - 1].orderId + 1 : 1;

    const typedItemTitle = itemTitle as ItemTitleType;

    switch (typedItemTitle) {
      case "Бахрома": {
        const newItem: ItemType<FringeType> = {
          id: nanoid(),
          orderId,
          itemTitle: "Бахрома",
          objectId: object.id,
          item: defaultFringe,
        };
        addToDB<FringeType>(newItem);
        break;
      }
      case "Гибкий неон": {
        const newItem: ItemType<NeonType> = {
          id: nanoid(),
          orderId,
          itemTitle: "Гибкий неон",
          objectId: object.id,
          item: defaultNeon,
        };
        addToDB<NeonType>(newItem);
        break;
      }
      case "Нить": {
        const newItem: ItemType<ThreadType> = {
          id: nanoid(),
          orderId,
          itemTitle: "Нить",
          objectId: object.id,
          item: defaultThread,
        };
        addToDB<ThreadType>(newItem);
        break;
      }
      case "Белт-лайт": {
        const newItem: ItemType<BeltLightType> = {
          id: nanoid(),
          orderId,
          itemTitle: "Белт-лайт",
          objectId: object.id,
          item: beltLightDefault,
        };
        addToDB<BeltLightType>(newItem);
        break;
      }
      case "Занавес": {
        const newItem: ItemType<CurtainType> = {
          id: nanoid(),
          orderId,
          itemTitle: "Занавес",
          objectId: object.id,
          item: curtainDefault,
        };
        addToDB<CurtainType>(newItem);
        break;
      }
      case "Трос": {
        const newItem: ItemType<RopeType> = {
          id: nanoid(),
          orderId,
          itemTitle: "Трос",
          objectId: object.id,
          item: ropeDefault,
        };
        addToDB<RopeType>(newItem);
        break;
      }
      case "Кабель ПВС": {
        const newItem: ItemType<PVSType> = {
          id: nanoid(),
          orderId,
          itemTitle: "Кабель ПВС",
          objectId: object.id,
          item: pvsDefault,
        };
        addToDB<PVSType>(newItem);
        break;
      }
      case "Гофра для кабеля ПВС": {
        const newItem: ItemType<CorrugationType> = {
          id: nanoid(),
          orderId,
          itemTitle: "Гофра для кабеля ПВС",
          objectId: object.id,
          item: corrugationDefault,
        };
        addToDB<CorrugationType>(newItem);
        break;
      }
      case "Кабель-канал (короб) для кабеля ПВС": {
        const newItem: ItemType<BoxPVSType> = {
          id: nanoid(),
          orderId,
          itemTitle: "Кабель-канал (короб) для кабеля ПВС",
          objectId: object.id,
          item: boxPvsDefault,
        };
        addToDB<BoxPVSType>(newItem);
        break;
      }
      case "Реле и выключатели": {
        const newItem: ItemType<RelaysSwitchesType> = {
          id: nanoid(),
          orderId,
          itemTitle: "Реле и выключатели",
          objectId: object.id,
          item: relaysSwitchesDefault,
        };
        addToDB<RelaysSwitchesType>(newItem);
        break;
      }
      case "Распаячная коробка": {
        const newItem: ItemType<SolderBoxType> = {
          id: nanoid(),
          orderId,
          itemTitle: "Распаячная коробка",
          objectId: object.id,
          item: solderBoxDefault,
        };
        addToDB<SolderBoxType>(newItem);
        break;
      }
      case "Ваги (клемма)": {
        const newItem: ItemType<VagiType> = {
          id: nanoid(),
          orderId,
          itemTitle: "Ваги (клемма)",
          objectId: object.id,
          item: vagiDefault,
        };
        addToDB<VagiType>(newItem);
        break;
      }
      case "Стяжка 480-500мм": {
        const newItem: ItemType<Screed_480_500_Type> = {
          id: nanoid(),
          orderId,
          itemTitle: "Стяжка 480-500мм",
          objectId: object.id,
          item: Screed_480_500_default,
        };
        addToDB<Screed_480_500_Type>(newItem);
        break;
      }
      case "Стяжка 200мм": {
        const newItem: ItemType<Screed_200_Type> = {
          id: nanoid(),
          orderId,
          itemTitle: "Стяжка 200мм",
          objectId: object.id,
          item: screed_200_default,
        };
        addToDB<Screed_200_Type>(newItem);
        break;
      }
      default:
        break;
    }

    function addToDB<T extends AllItemsTypes>(newItem: ItemType<T>) {
      idb?.items
        .add<T>(newItem!)
        .then(() => getItems())
        .catch((err) => {
          console.error(err);
        });
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className={classes.wrapper}>
      <div
        className={classes.header}
        style={{
          marginBottom: `${items.length === 0 ? "16px" : "0"}`,
        }}
      >
        <h3 className={classes.object}>{object.title}</h3>
        <CloseSVG onClick={() => deleteObject()} />
      </div>
      <div
        className={classes.items}
        style={{
          margin: `${items.length === 0 ? "0" : "16px 0"}`,
        }}
      >
        {items.map((itemObj, i) => {
          switch (itemObj.itemTitle) {
            case "Бахрома":
              return (
                <Fringe
                  getItems={() => getItems()}
                  key={i}
                  deleteItem={() => deleteItem(itemObj.id)}
                  itemObj={itemObj as ItemType<FringeType>}
                />
              );
            case "Гибкий неон":
              return (
                <Neon
                  getItems={() => getItems()}
                  itemObj={itemObj as ItemType<NeonType>}
                  key={i}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Нить":
              return (
                <Thread
                  getItems={() => getItems()}
                  itemObj={itemObj as ItemType<ThreadType>}
                  key={i}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Белт-лайт":
              return (
                <BeltLight
                  key={i}
                  getItems={() => getItems()}
                  itemObj={itemObj as ItemType<BeltLightType>}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Занавес":
              return (
                <Curtain
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<CurtainType>}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Трос":
              return (
                <Rope
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<RopeType>}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Кабель ПВС":
              return (
                <PVS
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<PVSType>}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Гофра для кабеля ПВС":
              return (
                <CorrugationPVS
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<CorrugationType>}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Кабель-канал (короб) для кабеля ПВС":
              return (
                <BoxPVS
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<BoxPVSType>}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Реле и выключатели":
              return (
                <RelaysSwitches
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<RelaysSwitchesType>}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Распаячная коробка": {
              return (
                <SolderBox
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<SolderBoxType>}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            }
            case "Ваги (клемма)":
              return (
                <Vagi
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<VagiType>}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Стяжка 480-500мм":
              return (
                <Screed_480_500
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<Screed_480_500_Type>}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Стяжка 200мм":
              return (
                <Screed_200
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<Screed_200_Type>}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            default:
              return <></>;
          }
        })}
      </div>
      <div className={classes.pickers}>
        <PickItem addItem={(item) => addItem(item)} />
        <NoMedia />
      </div>
    </div>
  );
}
