import Image from "next/image";
import classes from "./MediaList.module.scss";
import { Media } from "../Media/Media";
import { AddMedia } from "../AddMedia";

export function MediaList({
  urls,
  callback,
  deleteMedia,
  mediaHeight,
  mediaWidth
}: {
  urls: string[];
  callback: (file: File) => void;
  deleteMedia: (delUrl: string) => void;
  mediaWidth?: number;
  mediaHeight?: number;
}) {
  return (
    <div className={classes.wrapper}>
      {urls.map((url, i) => (
        <Media src={url} key={i} deleteMedia={deleteMedia} mediaHeight={mediaHeight} mediaWidth={mediaWidth}/>
      ))}
      <AddMedia callback={callback} width={mediaWidth} height={mediaHeight}/>
    </div>
  );
}
