import {
  ItemType,
  MeasureType,
  OrderType,
  ObjectType,
  CommonItemType,
  AllItemsTypes,
} from "@/fsd/entities";
import { IndexType, ObjectStoreType } from "./types";

export class IndexedDB {
  db: IDBDatabase | null;
  measures;
  objects;
  items;
  orders;

  constructor() {
    this.db = null;
    this.orders = {
      getAll: (range?: IDBKeyRange) => {
        return new Promise<OrderType[]>((resolve, reject) => {
          this.transactionHandler(
            "orders",
            "readonly",
            this.getAllHandler,
            range
          )
            .then((orders) => {
              resolve(orders as OrderType[]);
            })
            .catch((err) => reject(err));
        });
      },
      add: (order: OrderType) => {
        return new Promise<IDBValidKey>((resolve, reject) => {
          this.transactionHandler("orders", "readwrite", this.addHandler, order)
            .then((key) => {
              resolve(key as IDBValidKey);
            })
            .catch((err) => reject(err));
        });
      },
      get: (id: IDBValidKey) => {
        return new Promise<OrderType>((resolve, reject) => {
          this.getInIndex("orders", "numberOfOrder_idx", id)
            .then((orders) => {
              resolve((orders as OrderType[])[0]);
            })
            .catch((err) => reject(err));
        });
      },
      update: (order: OrderType) => {
        return new Promise<IDBValidKey>((resolve, reject) => {
          this.transactionHandler("orders", "readwrite", this.putHandler, order)
            .then((key) => {
              resolve(key as IDBValidKey);
            })
            .catch((err) => reject(err));
        });
      },
    };
    this.measures = {
      add: (measure: MeasureType) => {
        return new Promise<IDBValidKey>((resolve, reject) => {
          this.transactionHandler(
            "measures",
            "readwrite",
            this.addHandler,
            measure
          )
            .then((key) => {
              resolve(key as IDBValidKey);
            })
            .catch((err) => reject(err));
        });
      },
      getAll: (range?: IDBKeyRange) => {
        return new Promise<MeasureType[]>((resolve, reject) => {
          this.transactionHandler(
            "measures",
            "readonly",
            this.getAllHandler,
            range
          )
            .then((measures) => {
              resolve(measures as MeasureType[]);
            })
            .catch((err) => reject(err));
        });
      },
      delete: (range: IDBKeyRange | IDBValidKey) => {
        return new Promise<undefined>((resolve, reject) => {
          this.transactionHandler(
            "measures",
            "readwrite",
            this.deleteHandler,
            range
          )
            .then((data) => {
              resolve(data as undefined);
            })
            .catch((err) => reject(err));
        });
      },
      clear: () => {
        return new Promise<undefined>((resolve, reject) => {
          this.transactionHandler(
            "measures",
            "readwrite",
            this.clearHandler,
            undefined
          )
            .then((data) => {
              resolve(data as undefined);
            })
            .catch((err) => reject(err));
        });
      },
      rewrite: (newMeasures: MeasureType[]) => {
        return new Promise<void>((resolve, reject) => {
          this.measures
            .clear()
            .then(() => {
              if (!newMeasures.length) resolve();
              newMeasures.forEach(async (measure, index) => {
                await this.measures.add(measure);
                if (index === newMeasures.length - 1) {
                  resolve();
                }
              });
            })
            .catch((err) => {
              reject(err);
            });
        });
      },
      getOwn: (id: IDBValidKey) => {
        return new Promise<MeasureType[]>((resolve, reject) => {
          this.getInIndex("measures", "orders_idx", id)
            .then((measures) => {
              resolve(measures as MeasureType[]);
            })
            .catch((err) => reject(err));
        });
      },
      update: (measure: MeasureType) => {
        return new Promise<IDBValidKey>((resolve, reject) => {
          this.transactionHandler(
            "measures",
            "readwrite",
            this.putHandler,
            measure
          )
            .then((key) => {
              resolve(key as IDBValidKey);
            })
            .catch((err) => reject(err));
        });
      },
    };
    this.objects = {
      add: (object: ObjectType) => {
        return new Promise<IDBValidKey>((resolve, reject) => {
          this.transactionHandler(
            "objects",
            "readwrite",
            this.addHandler,
            object
          )
            .then((key) => {
              resolve(key as IDBValidKey);
            })
            .catch((err) => reject(err));
        });
      },
      getAll: (range?: IDBKeyRange) => {
        return new Promise<ObjectType[]>((resolve, reject) => {
          this.transactionHandler(
            "objects",
            "readonly",
            this.getAllHandler,
            range
          )
            .then((objects) => {
              resolve(objects as ObjectType[]);
            })
            .catch((err) => reject(err));
        });
      },
      getOwn: (range: IDBValidKey) => {
        return new Promise<ObjectType[]>((resolve, reject) => {
          this.getInIndex("objects", "measure_idx", range)
            .then((objects) => {
              resolve(objects as ObjectType[]);
            })
            .catch((err) => reject(err));
        });
      },
      delete: (range: IDBKeyRange | IDBValidKey) => {
        return new Promise<undefined>((resolve, reject) => {
          this.transactionHandler(
            "objects",
            "readwrite",
            this.deleteHandler,
            range
          )
            .then((data) => {
              resolve(data as undefined);
            })
            .catch((err) => reject(err));
        });
      },
      clear: () => {
        return new Promise<undefined>((resolve, reject) => {
          this.transactionHandler(
            "objects",
            "readwrite",
            this.clearHandler,
            undefined
          )
            .then((data) => {
              resolve(data as undefined);
            })
            .catch((err) => reject(err));
        });
      },
      rewrite: (newObjects: ObjectType[]) => {
        return new Promise<void>((resolve, reject) => {
          this.objects
            .clear()
            .then(() => {
              if (!newObjects.length) resolve();
              newObjects.forEach(async (object, index) => {
                await this.objects.add(object);
                if (index === newObjects.length - 1) {
                  resolve();
                }
              });
            })
            .catch((err) => {
              reject(err);
            });
        });
      },
    };
    this.items = {
      add: <T extends AllItemsTypes>(item: ItemType<T>) => {
        return new Promise<IDBValidKey>((resolve, reject) => {
          this.transactionHandler("items", "readwrite", this.addHandler, item)
            .then((key) => {
              resolve(key as IDBValidKey);
            })
            .catch((err) => reject(err));
        });
      },
      getOwn: (range: IDBValidKey) => {
        return new Promise<CommonItemType[]>((resolve, reject) => {
          this.getInIndex("items", "objects_idx", range)
            .then((items) => {
              resolve(items as CommonItemType[]);
            })
            .catch((err) => reject(err));
        });
      },
      delete: (range: IDBKeyRange | IDBValidKey) => {
        return new Promise<undefined>((resolve, reject) => {
          this.transactionHandler(
            "items",
            "readwrite",
            this.deleteHandler,
            range
          )
            .then((data) => {
              resolve(data as undefined);
            })
            .catch((err) => reject(err));
        });
      },
      clear: () => {
        return new Promise<undefined>((resolve, reject) => {
          this.transactionHandler(
            "items",
            "readwrite",
            this.clearHandler,
            undefined
          )
            .then((data) => {
              resolve(data as undefined);
            })
            .catch((err) => reject(err));
        });
      },
      rewrite: (newItems: CommonItemType[]) => {
        return new Promise<void>((resolve, reject) => {
          this.items
            .clear()
            .then(() => {
              if (!newItems.length) resolve();
              newItems.forEach(async (item, index) => {
                await this.items.add<AllItemsTypes>(item);
                if (index === newItems.length - 1) {
                  resolve();
                }
              });
            })
            .catch((err) => {
              reject(err);
            });
        });
      },
      update: <T extends AllItemsTypes>(item: ItemType<T>) => {
        return new Promise<IDBValidKey>((resolve, reject) => {
          this.transactionHandler("items", "readwrite", this.putHandler, item)
            .then((key) => {
              resolve(key as IDBValidKey);
            })
            .catch((err) => reject(err));
        });
      },
      getAll: (range?: IDBKeyRange) => {
        return new Promise<CommonItemType[]>((resolve, reject) => {
          this.transactionHandler(
            "items",
            "readonly",
            this.getAllHandler,
            range
          )
            .then((items) => {
              resolve(items as CommonItemType[]);
            })
            .catch((err) => reject(err));
        });
      },
      get: <T extends AllItemsTypes>(key: IDBValidKey) => {
        return new Promise<ItemType<T>>((resolve, reject) => {
          this.transactionHandler("items", "readonly", this.getHandler, key)
            .then((item) => {
              resolve(item as ItemType<T>);
            })
            .catch((err) => reject(err));
        });
      },
    };
  }

  idbInit() {
    return new Promise<void>((resolve, reject) => {
      let openRequest = indexedDB.open("garland_house", 1);

      openRequest.onupgradeneeded = (event) => {
        this.db = openRequest.result;

        switch (event.oldVersion) {
          case 0:
            let measures = this.db.createObjectStore("measures", {
              keyPath: "id",
              autoIncrement: false,
            });

            let objects = this.db.createObjectStore("objects", {
              keyPath: "id",
              autoIncrement: false,
            });

            let items = this.db.createObjectStore("items", {
              keyPath: "id",
              autoIncrement: false,
            });

            let orders = this.db.createObjectStore("orders", {
              keyPath: "id",
              autoIncrement: false,
            });

            objects.createIndex("measure_idx", "measureId");
            items.createIndex("objects_idx", "objectId");
            orders.createIndex("numberOfOrder_idx", "numberOfOrder");
            measures.createIndex("orders_idx", "ownOrder");
            break;
          default:
            break;
        }
      };
      openRequest.onerror = function () {
        reject(openRequest.error);
      };

      openRequest.onsuccess = () => {
        if (!this.db) this.db = openRequest.result;

        this.db.onversionchange = () => {
          this.db?.close();
          alert(
            "Ваша база данных устарела. Пожалуйста, закройте все вкладки приложения и перезайдите"
          );
        };
        resolve();
      };

      openRequest.onblocked = () => {
        alert(
          "Ваша база данных устарела. Пожалуйста, закройте все вкладки приложения и перезайдите"
        );
      };
    });
  }

  idbDelete() {
    return new Promise<void>((resolve, reject) => {
      this.db?.close();

      let deleteRequest = indexedDB.deleteDatabase("garland_house");

      deleteRequest.onsuccess = () => {
        resolve();
      };

      deleteRequest.onerror = (err) => {
        reject(err);
      };
    });
  }

  transactionHandler(
    objectStore: ObjectStoreType,
    mode: IDBTransactionMode,
    callback: (store: IDBObjectStore, payload: any) => Promise<any>,
    payload: any
  ) {
    return new Promise((resolve, reject) => {
      if (this.db) {
        let transaction = this.db.transaction(objectStore, mode);
        let store = transaction.objectStore(objectStore);
        callback(store, payload)
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        reject("База данных не инициализирована");
      }
    });
  }

  getInIndex(
    objectStore: ObjectStoreType,
    index: IndexType,
    range: IDBValidKey
  ) {
    return new Promise((resolve, reject) => {
      if (this.db) {
        let transaction = this.db.transaction(objectStore, "readonly");
        let store = transaction.objectStore(objectStore);
        let indexStore = store.index(index);

        let request = indexStore.getAll(range);

        request.onsuccess = function () {
          resolve(request.result);
        };
        request.onerror = function () {
          reject(request.error);
        };
      }
    });
  }

  addHandler(store: IDBObjectStore, object: any) {
    return new Promise((resolve, reject) => {
      let request = store.add(object);

      request.onsuccess = function () {
        resolve(request.result);
      };
      request.onerror = function () {
        reject(request.error);
      };
    });
  }

  getAllHandler(store: IDBObjectStore, range?: IDBKeyRange) {
    return new Promise((resolve, reject) => {
      let request = null;

      if (range) {
        request = store.getAll(range);
      } else {
        request = store.getAll();
      }

      request.onsuccess = function () {
        resolve(request.result);
      };
      request.onerror = function () {
        reject(request.error);
      };
    });
  }
  deleteHandler(store: IDBObjectStore, range: IDBKeyRange) {
    return new Promise<undefined>((resolve, reject) => {
      let request = store.delete(range);

      request.onsuccess = function () {
        resolve(request.result);
      };
      request.onerror = function () {
        reject(request.error);
      };
    });
  }

  clearHandler(store: IDBObjectStore) {
    return new Promise((resolve, reject) => {
      let request = store.clear();

      request.onsuccess = function () {
        resolve(request.result);
      };
      request.onerror = function () {
        reject(request.error);
      };
    });
  }
  putHandler(store: IDBObjectStore, object: any) {
    return new Promise<IDBValidKey>((resolve, reject) => {
      let request = store.put(object);

      request.onsuccess = function () {
        resolve(request.result);
      };
      request.onerror = function () {
        reject(request.error);
      };
    });
  }
  getHandler(store: IDBObjectStore, key: IDBValidKey) {
    return new Promise((resolve, reject) => {
      let request = store.get(key);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }
}
