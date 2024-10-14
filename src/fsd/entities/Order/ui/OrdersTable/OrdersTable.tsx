"use client";

import Filter from "./images/filter.svg";
import classes from "./OrdersTable.module.scss";
import { mockOrders, OrderStatusType, OrderType } from "../../model";
import Link from "next/link";
import { IDBContext, StatusTab } from "@/fsd/shared";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { CheckboxFilter } from "@/fsd/features";
import Arrow from "./images/arrow.svg";
import { useRouter } from "nextjs-toploader/app";

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

  function getOrders() {
    idb?.orders
      .getAll()
      .then((data) => {
        function orderIdSort(obj1: OrderType, obj2: OrderType) {
          if (obj1.numberOfOrder > obj2.numberOfOrder) return 1;
          if (obj1.numberOfOrder < obj2.numberOfOrder) return -1;
          return 0;
        }
        const newOrders = data.sort(orderIdSort);
        setOrders(newOrders);
        setFiltOrders(newOrders);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function sortById() {
    setFiltOrders(filtOrders.reverse());
    setIdSort(!idSort);
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
    console.log("sort by  manager");
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
    setBudgetSort(!budgetSort);

    const sortedArr = filtOrders;

    if (budgetSort) {
      sortedArr.sort((order1, order2) => {
        if (order1.measurePrice > order2.measurePrice) return 1;
        if (order1.measurePrice < order2.measurePrice) return -1;
        return 0;
      }) 
    } else {
      sortedArr.sort((order1, order2) => {
        if (order1.measurePrice < order2.measurePrice) return 1;
        if (order1.measurePrice > order2.measurePrice) return -1;
        return 0;
      }); 
    }

    setFiltOrders(sortedArr);
  }

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    let filteredArr = orders;

    filteredArr = orders.filter((order) => {
      if (order.customerPhone.includes(searchVal)) return true;
      else if (order.address.includes(searchVal)) return true;
      else if (order.customer.includes(searchVal)) return true;
      else return false;
    });

    if (statusFilter.value.length) {
      filteredArr = filteredArr.filter((order) =>
        statusFilter.value.includes(order.status)
      );
    }

    if (managerFilter.value.length) {
      filteredArr = filteredArr.filter((order) => {
        console.log(managerFilter.value);
        console.log(order.manager);
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
                  checkeds={statusFilter.value}
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
                  checkeds={statusFilter.value}
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
            <div
              className={classes.headers}
              onClick={() => setCreateSort(!createSort)}
            >
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
            <div>
              <span>AmoCRM</span>
            </div>
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
            <td>{order.address}</td>
            <td>
              <StatusTab status={order.status} />
            </td>
            <td>{order.manager}</td>
            <td>{order.executor}</td>
            <td>{order.measureDate}</td>
            <td>
              <Link href="/orders" className={classes.amoCRM}>
                {order.amoCRMLink}
              </Link>
            </td>
            <td className={classes.budget}>
              <span>{order.measurePrice}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
