import React from "react";

import styles from "./ListVideoList.module.scss";
import ListVideoItem from "../ListVideoItem/ListVideoItem";

type VideosArrayPropType = {
  videos: any[];
};

const ListVideoList = ({ videos = [] }: VideosArrayPropType) => {
  return (
    <div className={styles.grid_list_wrapper}>
      {videos.map((item, index) => (
        <ListVideoItem
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

export default ListVideoList;
