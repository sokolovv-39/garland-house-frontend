"use client";

import { useState } from "react";
import classes from "./Report.module.scss";
import { MediaList } from "@/fsd/entities";

export function Report() {
  const [urls, setUrls] = useState<string[]>([]);

  function addMedia(files: FileList) {
    const newFiles = [];
    for (const file of files) newFiles.push(URL.createObjectURL(file));
    setUrls([...urls, ...newFiles]);
  }

  function deleteMedia(delUrl: string) {
    const filteredArr = urls.filter((url) => url !== delUrl);
    setUrls(filteredArr);
  }

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title}>Отчет</h2>
      <MediaList
        urls={urls}
        callback={addMedia}
        deleteMedia={deleteMedia}
        mediaHeight={120}
        mediaWidth={200}
      />
    </div>
  );
}
