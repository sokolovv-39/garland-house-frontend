"use client";

import Link from "next/link";
import classes from "./PageTabs.module.scss";
import { usePathname } from "next/navigation";

export function PageTabs() {
  const pathname = usePathname();

  function getStroke(url: string) {
    if (pathname.includes(url)) return `#191919`;
    else return "#A9A9A9";
  }

  return (
    <div className={classes.wrapper}>
      <Link
        href="/orders"
        className={`${classes.link} ${
          pathname.includes("/orders") && classes.active
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M18.0515 8.7L17.2348 12.1833C16.5348 15.1917 15.1515 16.4083 12.5515 16.1583C12.1348 16.125 11.6848 16.05 11.2015 15.9333L9.80145 15.6C6.32645 14.775 5.25145 13.0583 6.06812 9.575L6.88479 6.08334C7.05145 5.375 7.25145 4.75833 7.50145 4.25C8.47645 2.23333 10.1348 1.69167 12.9181 2.35L14.3098 2.675C17.8015 3.49167 18.8681 5.21667 18.0515 8.7Z"
            stroke={getStroke("orders")}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.5513 16.1583C12.0346 16.5083 11.3846 16.8 10.5929 17.0583L9.27626 17.4917C5.96793 18.5583 4.22626 17.6667 3.15126 14.3583L2.08459 11.0667C1.01793 7.75833 1.90126 6.00833 5.20959 4.94167L6.52626 4.50833C6.86793 4.4 7.19293 4.30833 7.50126 4.25C7.25126 4.75833 7.05126 5.375 6.88459 6.08333L6.06793 9.575C5.25126 13.0583 6.32626 14.775 9.80126 15.6L11.2013 15.9333C11.6846 16.05 12.1346 16.125 12.5513 16.1583Z"
            stroke={getStroke("orders")}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.5352 7.10833L14.5768 8.13333"
            stroke={getStroke("orders")}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.71484 10.3333L12.1315 10.95"
            stroke={getStroke("orders")}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Заказы</span>
      </Link>
      <Link
        href="/gallery"
        className={`${classes.link} ${
          pathname.includes("/gallery") && classes.active
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M15 5.83333V14.1667C15 14.6833 14.9833 15.1417 14.925 15.55C14.6833 17.7417 13.65 18.3333 10.8333 18.3333H9.16667C6.35 18.3333 5.31667 17.7417 5.075 15.55C5.01667 15.1417 5 14.6833 5 14.1667V5.83333C5 5.31667 5.01667 4.85833 5.075 4.45C5.31667 2.25833 6.35 1.66667 9.16667 1.66667H10.8333C13.65 1.66667 14.6833 2.25833 14.925 4.45C14.9833 4.85833 15 5.31667 15 5.83333Z"
            stroke={getStroke("gallery")}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.0013 14.1667C5.0013 14.6833 5.01797 15.1417 5.0763 15.55C4.95964 15.5583 4.8513 15.5583 4.7263 15.5583H4.44297C2.2263 15.5583 1.66797 15 1.66797 12.775V7.225C1.66797 5 2.2263 4.44167 4.44297 4.44167H4.7263C4.8513 4.44167 4.95964 4.44167 5.0763 4.45C5.01797 4.85833 5.0013 5.31667 5.0013 5.83333V14.1667Z"
            stroke={getStroke("gallery")}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.3341 7.225V12.775C18.3341 15 17.7758 15.5583 15.5591 15.5583H15.2758C15.1508 15.5583 15.0424 15.5583 14.9258 15.55C14.9841 15.1417 15.0008 14.6833 15.0008 14.1667V5.83333C15.0008 5.31667 14.9841 4.85833 14.9258 4.45C15.0424 4.44167 15.1508 4.44167 15.2758 4.44167H15.5591C17.7758 4.44167 18.3341 5 18.3341 7.225Z"
            stroke={getStroke("gallery")}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Галерея</span>
      </Link>
    </div>
  );
}
