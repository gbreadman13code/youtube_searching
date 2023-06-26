import React from "react";

import styles from "./GridVideoList.module.scss";

import GridVideoItem from "../GridVideoItem/GridVideoItem";

type VideosArrayPropType = {
  videos: any[];
};

const GridVideoList = ({ videos = [] }: VideosArrayPropType) => {
  return (
    <div className={styles.grid_list_wrapper}>
      {videos.map((item, index) => (
        <GridVideoItem
          key={index}
          title={item.snippet.title}
          chanel={item.snippet.channelTitle}
          thumbnails={item.snippet.thumbnails}
          videoId={item.id.videoId}
        />
      ))}
    </div>
  );
};

export default GridVideoList;
