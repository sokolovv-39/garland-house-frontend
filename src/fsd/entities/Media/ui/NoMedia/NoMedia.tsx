"use client";

import { PlusSVG } from "@/fsd/shared";
import classes from "./NoMedia.module.scss";
import { useEffect, useState } from "react";
import { MediaList } from "../MediaList";
import { uploadMedia } from "../../lib";

export function NoMedia({ type }: { type: string }) {
  const [hover, setHover] = useState(false);
  const [mediaURLs, setMediaURLs] = useState<string[]>([]);

  function addMedia(files: FileList) {
    const newFiles = [];
    for (const file of files) {
      newFiles.push(URL.createObjectURL(file));
    }
    setMediaURLs([...mediaURLs, ...newFiles]);
  }

  function deleteMedia(delUrl: string) {
    const filteredArr = mediaURLs.filter((url) => url !== delUrl);
    setMediaURLs(filteredArr);
  }

  function addFirstMedia() {
    uploadMedia()
      .then((files) => {
        const newFiles = [];
        for (const file of files) {
          newFiles.push(URL.createObjectURL(file));
        }
        setMediaURLs([...mediaURLs, ...newFiles]);
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
          <span className={classes.title}>{type}</span>
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
