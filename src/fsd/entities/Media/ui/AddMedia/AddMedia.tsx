import { PlusSVG } from "@/fsd/shared";
import classes from "./AddMedia.module.scss";
import { uploadMedia } from "../../lib";

export function AddMedia({
  callback,
  width,
  height,
}: {
  callback: (files: FileList) => void;
  width?: number;
  height?: number;
}) {
  function addMedia() {
    uploadMedia()
      .then((files) => {
        callback(files);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div
      className={classes.wrapper}
      onClick={addMedia}
      style={{
        width: width ? `${width}px` : "120px",
        height: height ? `${height}px` : "72px",
      }}
    >
      <PlusSVG />
    </div>
  );
}
