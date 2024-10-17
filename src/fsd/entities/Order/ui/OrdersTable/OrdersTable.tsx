"use client";

import Filter from "./images/filter.svg";
import classes from "./OrdersTable.module.scss";
import { OrderStatusType, OrderType } from "../../model";
import Link from "next/link";
import { DateFormatter, IDBContext, splitPrice, StatusTab } from "@/fsd/shared";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { CheckboxFilter } from "@/fsd/features";
import Arrow from "./images/arrow.svg";
import { useRouter } from "nextjs-toploader/app";
import { generateRFP } from "@/fsd/features/OrderActions/lib";

export function OrdersTable({ searchVal }: { searchVal: string }) {
  const idb = useContext(IDBContext);
  const router = useRouter();

  const [orders, setOrders] = useState<OrderType[]>([]);
  const [filtOrders, setFiltOrders] = useState<OrderType[]>([]);
  const [statusFilter, setStatusFilter] = useState<{
    isOpen: boolean;
    value: OrderStatusType[];
  }>({
    isOpen: false,
    value: [],
  });
  const [managerFilter, setManagerFilter] = useState<{
    isOpen: boolean;
    value: string[];
  }>({
    isOpen: false,
    value: [],
  });
  const [executorFilter, setExecutorFilter] = useState<{
    isOpen: boolean;
    value: string[];
  }>({
    isOpen: false,
    value: [],
  });
  const [idSort, setIdSort] = useState(false);
  const [createSort, setCreateSort] = useState(false);
  const [budgetSort, setBudgetSort] = useState(false);

  async function getOrders() {
    let newOrders = await idb!.orders.getAll();

    newOrders = await Promise.all(
      newOrders.map(async (order) => {
        const rfpFork = await getRfpFork(order);
        return {
          ...order,
          rfpFork,
        };
      })
    );

    function orderIdSort(obj1: OrderType, obj2: OrderType) {
      if (obj1.numberOfOrder > obj2.numberOfOrder) return 1;
      if (obj1.numberOfOrder < obj2.numberOfOrder) return -1;
      return 0;
    }

    newOrders.sort(orderIdSort);
    console.log("new orders", newOrders);

    setOrders(newOrders);
    setFiltOrders(newOrders);
  }

  function sortByStatus(status: OrderStatusType, checked: boolean) {
    if (checked) {
      setStatusFilter((prev) => {
        return {
          ...prev,
          value: [...prev.value, status],
        };
      });
    } else {
      setStatusFilter((prev) => {
        return {
          ...prev,
          value: prev.value.filter((val) => val !== status),
        };
      });
    }
  }

  function sortByManager(manager: string, checked: boolean) {
    if (checked) {
      setManagerFilter((prev) => {
        return {
          ...prev,
          value: [...prev.value, manager],
        };
      });
    } else {
      setManagerFilter((prev) => {
        return {
          ...prev,
          value: prev.value.filter((val) => val !== manager),
        };
      });
    }
  }

  function sortByExecutor(executor: string, checked: boolean) {
    if (checked) {
      setExecutorFilter((prev) => {
        return {
          ...prev,
          value: [...prev.value, executor],
        };
      });
    } else {
      setExecutorFilter((prev) => {
        return {
          ...prev,
          value: prev.value.filter((val) => val !== executor),
        };
      });
    }
  }

  function sortByBudget() {
    const newArr = filtOrders;

    function sortASC(order1: OrderType, order2: OrderType) {
      if (order1.rfpFork.maxRfpPrice > order2.rfpFork.maxRfpPrice) return 1;
      if (order1.rfpFork.maxRfpPrice < order2.rfpFork.maxRfpPrice) return -1;
      else return 0;
    }

    function sortDESC(order1: OrderType, order2: OrderType) {
      if (order1.rfpFork.maxRfpPrice > order2.rfpFork.maxRfpPrice) return -1;
      if (order1.rfpFork.maxRfpPrice < order2.rfpFork.maxRfpPrice) return 1;
      else return 0;
    }

    if (budgetSort) newArr.sort(sortASC);
    else newArr.sort(sortDESC);

    setFiltOrders(newArr);
    setBudgetSort(!budgetSort);
  }

  function sortById() {
    const newArr = filtOrders;

    function sortASC(order1: OrderType, order2: OrderType) {
      if (order1.numberOfOrder > order2.numberOfOrder) return 1;
      if (order1.numberOfOrder < order2.numberOfOrder) return -1;
      else return 0;
    }

    function sortDESC(order1: OrderType, order2: OrderType) {
      if (order1.numberOfOrder > order2.numberOfOrder) return -1;
      if (order1.numberOfOrder < order2.numberOfOrder) return 1;
      else return 0;
    }

    if (idSort) newArr.sort(sortASC);
    else newArr.sort(sortDESC);

    setFiltOrders(newArr);
    setIdSort(!idSort);
  }

  function sortByDate() {
    const newArr = filtOrders;

    function sortASC(order1: OrderType, order2: OrderType) {
      const dateFormatter = new DateFormatter();
      const order_1_time = dateFormatter.DMY_to_ms(order1.measureDate);
      const order_2_time = dateFormatter.DMY_to_ms(order2.measureDate);
      console.log("order_1_time", order_1_time);
      console.log("order_2_time", order_2_time);

      if (order_1_time > order_2_time) return 1;
      if (order_1_time < order_2_time) return -1;
      return 0;
    }

    function sortDESC(order1: OrderType, order2: OrderType) {
      const dateFormatter = new DateFormatter();
      const order_1_time = dateFormatter.DMY_to_ms(order1.measureDate);
      const order_2_time = dateFormatter.DMY_to_ms(order2.measureDate);

      if (order_1_time > order_2_time) return -1;
      if (order_1_time < order_2_time) return 1;
      return 0;
    }

    if (createSort) {
      newArr.sort(sortASC);
    } else newArr.sort(sortDESC);

    setFiltOrders(newArr);
    setCreateSort(!createSort);
  }

  async function getRfpFork(order: OrderType): Promise<{
    maxRfpPrice: number;
    minRfpPrice: number;
    noData: boolean;
  }> {
    const measures = await idb!.measures.getOwn(order.numberOfOrder);
    console.log("measures in table", measures);
    let maxCost = 0;
    let minCost = Infinity;
    await Promise.all(
      measures.map(async (measure) => {
        const cost = await generateRFP(idb!, measure.id, false);
        console.log("cost", cost);
        if (cost! > maxCost) maxCost = cost!;
        if (cost! < minCost) minCost = cost!;
      })
    );

    if (maxCost === 0 || minCost === Infinity) {
      return {
        noData: true,
        maxRfpPrice: 0,
        minRfpPrice: 0,
      };
    } else {
      return {
        noData: false,
        maxRfpPrice: maxCost,
        minRfpPrice: minCost,
      };
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    console.log("searchVal", searchVal);
    let filteredArr = orders;

    filteredArr = orders.filter((order) => {
      if (
        order.customerPhone
          .toLocaleLowerCase()
          .includes(searchVal.toLocaleLowerCase())
      )
        return true;
      else if (
        order.address
          .toLocaleLowerCase()
          .includes(searchVal.toLocaleLowerCase())
      )
        return true;
      else if (
        order.customer
          .toLocaleLowerCase()
          .includes(searchVal.toLocaleLowerCase())
      )
        return true;
      else return false;
    });

    if (statusFilter.value.length) {
      filteredArr = filteredArr.filter((order) =>
        statusFilter.value.includes(order.status)
      );
    }

    if (managerFilter.value.length) {
      filteredArr = filteredArr.filter((order) => {
        return managerFilter.value.includes(order.manager);
      });
    }

    if (executorFilter.value.length) {
      filteredArr = filteredArr.filter((order) =>
        executorFilter.value.includes(order.executor)
      );
    }
    setFiltOrders(filteredArr);
  }, [searchVal, statusFilter, managerFilter, executorFilter, orders]);

  /* useEffect(() => {
    async function runRfpFork() {
      const newOrders: OrderType[] = [];
      await Promise.all(
        orders.map(async (order) => {
          const rfpFork = await getRfpFork(order);
          newOrders.push({
            ...order,
            rfpFork,
          });
        })
      );
      setOrders(newOrders);
    }

    runRfpFork();
  }, [orders]); */

  return (
    <table className={classes.wrapper}>
      <thead>
        <tr>
          <th>
            <div className={classes.headers} onClick={sortById}>
              <span>№</span>
              <Image
                src={Arrow}
                alt=""
                style={{
                  transform: idSort ? "rotate(180deg)" : "",
                }}
              />
            </div>
          </th>
          <th>
            <div className={classes.headers}>
              <span>Заказчик</span>
            </div>
          </th>
          <th>
            <div className={classes.headers}>
              <span>Адрес</span>
            </div>
          </th>
          <th>
            <div
              className={`${classes.relative} ${classes.headers}`}
              onClick={(e) => {
                e.stopPropagation();
                setStatusFilter((prev) => {
                  return {
                    ...prev,
                    isOpen: !prev.isOpen,
                  };
                });
              }}
              style={{
                cursor: "pointer",
              }}
            >
              <span>Статус</span>
              <Image src={Filter} alt="" />
              {statusFilter.isOpen && (
                <CheckboxFilter
                  checkeds={statusFilter.value}
                  onChange={sortByStatus}
                  closeFilter={() =>
                    setStatusFilter((prev) => {
                      return {
                        ...prev,
                        isOpen: false,
                      };
                    })
                  }
                  type="status"
                />
              )}
            </div>
          </th>
          <th>
            <div
              className={`${classes.relative} ${classes.headers}`}
              onClick={(e) => {
                e.stopPropagation();
                setManagerFilter((prev) => {
                  return {
                    ...prev,
                    isOpen: !prev.isOpen,
                  };
                });
              }}
              style={{
                cursor: "pointer",
              }}
            >
              <span>Менеджер</span>
              <Image src={Filter} alt="" />
              {managerFilter.isOpen && (
                <CheckboxFilter
                  checkeds={managerFilter.value}
                  onChange={sortByManager}
                  closeFilter={() =>
                    setManagerFilter((prev) => {
                      return {
                        ...prev,
                        isOpen: false,
                      };
                    })
                  }
                  type="workers"
                />
              )}
            </div>
          </th>
          <th>
            <div
              className={`${classes.relative} ${classes.headers}`}
              onClick={(e) => {
                e.stopPropagation();
                setExecutorFilter((prev) => {
                  return {
                    ...prev,
                    isOpen: !prev.isOpen,
                  };
                });
              }}
              style={{
                cursor: "pointer",
              }}
            >
              <span>Исполнитель</span>
              <Image src={Filter} alt="" />
              {executorFilter.isOpen && (
                <CheckboxFilter
                  checkeds={executorFilter.value}
                  onChange={sortByExecutor}
                  closeFilter={() =>
                    setExecutorFilter((prev) => {
                      return {
                        ...prev,
                        isOpen: false,
                      };
                    })
                  }
                  type="workers"
                />
              )}
            </div>
          </th>
          <th>
            <div className={classes.headers} onClick={sortByDate}>
              <span>Создан</span>
              <Image
                src={Arrow}
                alt=""
                style={{
                  transform: createSort ? "rotate(180deg)" : "",
                }}
              />
            </div>
          </th>
          <th>
            <span>AmoCRM</span>
          </th>
          <th>
            <div className={classes.headers} onClick={sortByBudget}>
              <span>Бюджет</span>
              <Image
                src={Arrow}
                alt=""
                style={{
                  transform: budgetSort ? "rotate(180deg)" : "",
                }}
              />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {filtOrders.map((order) => (
          <tr
            key={order.id}
            onClick={() => router.push(`orders/${order.numberOfOrder}/basic`)}
            style={{ cursor: "pointer" }}
          >
            <td>{order.numberOfOrder}</td>
            <td className={classes.customer}>
              <span>{order.customer}</span>
              <span>{order.customerPhone}</span>
            </td>
            <td>
              <span>{order.address}</span>
            </td>
            <td>
              <StatusTab
                customStyles={{
                  padding: "4px 0",
                }}
                status={order.status}
              />
            </td>
            <td>{order.manager}</td>
            <td>{order.executor}</td>
            <td>{order.measureDate}</td>
            <td>
              <Link href="/orders" className={classes.amoCRM}>
                <span>{order.amoCRMLink}</span>
              </Link>
            </td>
            <td className={classes.budget}>
              {order.rfpFork.noData && (
                <span
                  style={{
                    justifyContent: "center",
                  }}
                >
                  н/д
                </span>
              )}
              {!order.rfpFork.noData &&
                order.rfpFork.maxRfpPrice === order.rfpFork.minRfpPrice && (
                  <span
                    style={{
                      justifyContent: "center",
                    }}
                  >
                    {splitPrice(order.rfpFork.maxRfpPrice)}
                  </span>
                )}
              {!order.rfpFork.noData &&
                order.rfpFork.maxRfpPrice !== order.rfpFork.minRfpPrice && (
                  <div className={classes.centerBudget}>
                    <div>
                      <span>
                        <span className={classes.forkText}>от </span>
                        {splitPrice(order.rfpFork.minRfpPrice)}
                      </span>
                      <span>
                        <span className={classes.forkText}>до </span>
                        {splitPrice(order.rfpFork.maxRfpPrice)}
                      </span>
                    </div>
                  </div>
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
