"use client";

import Image from "next/image";
import PhotoPNG from "./photo.png";
import classes from "./Photo.module.scss";

export function Photo({
  openPhoto,
  openEdit,
}: {
  openPhoto?: () => void;
  openEdit?: (e: React.MouseEvent<SVGElement>) => void;
}) {
  return (
    <div className={classes.wrapper} onClick={openPhoto}>
      <Image src={PhotoPNG} alt="" />
      <div className={classes.desc}>
        <p>с. Николо-урюпино, ул. Константинопольская, 98</p>
        <svg
          onClick={(e) => {
            if (openEdit) openEdit(e);
          }}
          className={classes.options}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g>
            <path
              stroke="#191919"
              d="M8 12H8.009M12.005 12H12.013M15.991 12H16"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              stroke="#191919"
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              strokeWidth="1.5"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
