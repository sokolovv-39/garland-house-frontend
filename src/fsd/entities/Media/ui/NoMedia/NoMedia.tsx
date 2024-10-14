'use client'

import { PlusSVG } from "@/fsd/shared";
import classes from "./NoMedia.module.scss";
import { useEffect, useState } from "react";
import { MediaList } from "../MediaList";
import { uploadMedia } from "../../lib";

export function NoMedia() {
  const [hover, setHover] = useState(false);
  const [mediaURLs, setMediaURLs] = useState<string[]>([]);

  function addMedia(file: File) {
    setMediaURLs([...mediaURLs, URL.createObjectURL(file)]);
  }

  function deleteMedia(delUrl: string) {
    const filteredArr = mediaURLs.filter((url) => url !== delUrl);
    setMediaURLs(filteredArr);
  }

  function addFirstMedia() {
    uploadMedia()
      .then((file) => {
        setMediaURLs([URL.createObjectURL(file)]);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      {mediaURLs.length === 0 ? (
        <div
          className={classes.wrapperUpload}
          onMouseEnter={() => {
            if (mediaURLs.length === 0) setHover(true);
          }}
          onMouseLeave={() => setHover(false)}
          onClick={() => addFirstMedia()}
          style={{
            cursor: `${mediaURLs.length === 0 ? "pointer" : "auto"}`,
          }}
        >
          <span className={classes.title}>Добавить фото или видео</span>
          <PlusSVG hovered={hover} disabled={mediaURLs.length > 0} />
        </div>
      ) : (
        <MediaList
          urls={mediaURLs}
          callback={addMedia}
          deleteMedia={deleteMedia}
        />
      )}
    </>
  );
}
