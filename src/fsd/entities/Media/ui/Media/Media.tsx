import Image from "next/image";
import classes from "./Media.module.scss";
import { CloseSVG } from "@/fsd/shared";

export function Media({
  src,
  deleteMedia,
  mediaHeight,
  mediaWidth,
}: {
  src: string;
  deleteMedia: (delUrl: string) => void;
  mediaWidth?: number;
  mediaHeight?: number;
}) {
  return (
    <div className={classes.wrapper}>
      <Image
        src={src}
        alt=""
        width={mediaWidth ? mediaWidth : 119}
        height={mediaHeight ? mediaHeight : 72}
        className={classes.image}
      />
      <CloseSVG
        photo
        style={{
          position: "absolute",
          top: '4px',
          right: '4px',
        }}
        onClick={() => deleteMedia(src)}
      />
    </div>
  );
}
