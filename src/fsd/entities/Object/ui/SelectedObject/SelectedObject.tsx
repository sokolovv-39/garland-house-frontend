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
  getPVSLength,
  getAllVagi,
  getSolderBoxPieces,
  getEsRope,
  get_Screeds_480_500_packs,
  get_screeds_200_packs,
  MontageType,
  montageDefault,
  Montage,
  ElectricShieldType,
  electricShieldDefault,
  ElectricShield,
  getFirstVagi,
} from "@/fsd/entities";
import { useState, useContext, useEffect } from "react";
import { ObjectType } from "../../model";
import { nanoid } from "nanoid";
import { defaultNeon, NeonType } from "@/fsd/entities/Neon/model";

export function SelectedObject({
  object,
  deleteObject,
  updateCost,
  updateObject,
}: {
  object: ObjectType;
  deleteObject: () => void;
  updateCost: () => void;
  updateObject: (obj: ObjectType) => void;
}) {
  const [items, setItems] = useState<CommonItemType[]>([]);
  const idb = useContext(IDBContext);
  const [objName, setObjName] = useState(object.title);
  const [openedId, setOpenedId] = useState("");
  const [vagi, setVagi] = useState(0);
  const [solderBoxes, setSolderBoxes] = useState(0);
  const [screeds_480_500, set_screeds_480_500] = useState(0);
  const [screeds_200, setScreeds_200] = useState(0);
  const [ropeMeters, setRopeMeters] = useState(0);

  function getItems() {
    return new Promise<CommonItemType[]>((resolve, reject) => {
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
          resolve(newItems);
        })
        .catch((err) => reject(err));
    });
  }

  function deleteItem(id: string) {
    getItems()
      .then((items) => {
        console.log("allItems in delete", items);
        let newItems = items.filter((item) => item.id !== id);
        newItems = newItems.map((item, index) => {
          return {
            ...item,
            orderId: index + 1,
          };
        });
        newItems.sort((a, b) => {
          if (a.orderId > b.orderId) return 1;
          else if (a.orderId < b.orderId) return -1;
          else return 0;
        });
        idb?.items
          .rewrite(newItems)
          .then(() => {
            getItems();
            updateCost();
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
      case "Монтаж и логистика": {
        const newItem: ItemType<MontageType> = {
          id: nanoid(),
          orderId,
          itemTitle: "Монтаж и логистика",
          objectId: object.id,
          item: montageDefault,
        };
        addToDB<MontageType>(newItem);
        break;
      }
      case "Электрический щиток": {
        const newItem: ItemType<ElectricShieldType> = {
          id: nanoid(),
          orderId,
          itemTitle: "Электрический щиток",
          objectId: object.id,
          item: electricShieldDefault,
        };
        addToDB<ElectricShieldType>(newItem);
        break;
      }
      default:
        break;
    }

    function addToDB<T extends AllItemsTypes>(newItem: ItemType<T>) {
      setOpenedId(newItem.id);
      idb?.items
        .add<T>(newItem!)
        .then(() => {
          getItems();
        })
        .catch();
    }
  }

  useEffect(() => {
    getItems();
  }, [openedId]);

  useEffect(() => {
    setVagi(getFirstVagi(items));

    setSolderBoxes(parseInt(getSolderBoxPieces(items).keyValue));

    let quantity_480_500 = 0;
    get_Screeds_480_500_packs(items).forEach((el) => {
      quantity_480_500 += parseInt(el.keyValue);
    });
    set_screeds_480_500(quantity_480_500);

    let quantity_screed_200 = 0;
    get_screeds_200_packs(items).forEach((el) => {
      quantity_screed_200 += parseInt(el.keyValue);
    });
    setScreeds_200(quantity_screed_200);

    let ropeLegth = 0;
    getEsRope(items).forEach((el) => {
      ropeLegth += Math.ceil(parseFloat(el.keyValue));
    });
    setRopeMeters(ropeLegth);
  }, [items]);

  return (
    <div className={classes.wrapper}>
      <div
        className={classes.header}
        style={{
          marginBottom: `${items.length === 0 ? "16px" : "0"}`,
        }}
      >
        <input
          className={classes.titleInput}
          type="text"
          value={objName}
          onChange={(e) => {
            setObjName(e.currentTarget.value);
            updateObject({
              ...object,
              title: e.currentTarget.value,
            });
          }}
        />
        {/* <h3 className={classes.object}>{object.title}</h3> */}
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
            case "Бахрома": {
              return (
                <Fringe
                  openedId={openedId}
                  updateCost={updateCost}
                  getItems={() => getItems()}
                  key={i}
                  deleteItem={() => deleteItem(itemObj.id)}
                  itemObj={itemObj as ItemType<FringeType>}
                />
              );
            }
            case "Гибкий неон":
              return (
                <Neon
                  openedId={openedId}
                  updateCost={updateCost}
                  getItems={() => getItems()}
                  itemObj={itemObj as ItemType<NeonType>}
                  key={i}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Нить":
              return (
                <Thread
                  openedId={openedId}
                  updateCost={updateCost}
                  getItems={() => getItems()}
                  itemObj={itemObj as ItemType<ThreadType>}
                  key={i}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Белт-лайт":
              return (
                <BeltLight
                  openedId={openedId}
                  updateCost={updateCost}
                  key={i}
                  getItems={() => getItems()}
                  itemObj={itemObj as ItemType<BeltLightType>}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Занавес":
              return (
                <Curtain
                  openedId={openedId}
                  updateCost={updateCost}
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<CurtainType>}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Трос":
              return (
                <Rope
                  meters={ropeMeters}
                  openedId={openedId}
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<RopeType>}
                  deleteItem={() => deleteItem(itemObj.id)}
                  updateCost={updateCost}
                />
              );
            case "Кабель ПВС":
              return (
                <PVS
                  openedId={openedId}
                  updateCost={updateCost}
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<PVSType>}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Гофра для кабеля ПВС":
              return (
                <CorrugationPVS
                  openedId={openedId}
                  updateCost={updateCost}
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<CorrugationType>}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Кабель-канал (короб) для кабеля ПВС":
              return (
                <BoxPVS
                  openedId={openedId}
                  updateCost={updateCost}
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<BoxPVSType>}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Реле и выключатели":
              return (
                <RelaysSwitches
                  openedId={openedId}
                  updateCost={updateCost}
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<RelaysSwitchesType>}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Распаячная коробка": {
              return (
                <SolderBox
                  quantity={solderBoxes}
                  openedId={openedId}
                  updateCost={updateCost}
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
                  quantity={vagi}
                  openedId={openedId}
                  updateCost={updateCost}
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<VagiType>}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Стяжка 480-500мм":
              return (
                <Screed_480_500
                  quantity={screeds_480_500}
                  openedId={openedId}
                  updateCost={updateCost}
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<Screed_480_500_Type>}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Стяжка 200мм":
              return (
                <Screed_200
                  quantity={screeds_200}
                  openedId={openedId}
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<Screed_200_Type>}
                  updateCost={updateCost}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Монтаж и логистика":
              return (
                <Montage
                  deleteItem={() => deleteItem(itemObj.id)}
                  openedId={openedId}
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<MontageType>}
                  updateCost={updateCost}
                />
              );
            case "Электрический щиток":
              return (
                <ElectricShield
                  deleteItem={() => deleteItem(itemObj.id)}
                  openedId={openedId}
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<ElectricShieldType>}
                  updateCost={updateCost}
                />
              );
            default:
              return <></>;
          }
        })}
      </div>
      <div className={classes.pickers}>
        <PickItem addItem={(item) => addItem(item)} />
        <NoMedia type="Добавить фото" addedType="Фото" />
        <NoMedia type="Добавить видео" addedType="Видео" />
        <NoMedia
          type="Добавить визуализацию объекта"
          addedType="Визуализация объекта"
        />
      </div>
    </div>
  );
}
