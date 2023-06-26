import React, { useState } from "react";
import styles from "./GridVideoItem.module.scss";

import { ReactComponent as PlaceholderImage } from "../../../assets/img/placeholder-image.svg";

type ImageCardPropType = {
  height: number;
  width: number;
  url: string;
};

type ImagesCardPropType = {
  default: ImageCardPropType;
  medium: ImageCardPropType;
  high: ImageCardPropType;
};

type VideoCardPropType = {
  title: string;
  chanel: string;
  viewsCount?: string;
  thumbnails: ImagesCardPropType;
  videoId: string;
};

const GridVideoItem = ({
  title,
  chanel,
  thumbnails,
  videoId,
}: VideoCardPropType) => {
  const [isLoadImg, setIsLoadImg] = useState(false);

  return (
    <a
      href={"https://youtu.be/" + videoId}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.item}
    >
      {!isLoadImg && <PlaceholderImage width={"100%"} />}
      <img
        src={thumbnails.medium.url}
        alt=""
        style={{ width: isLoadImg ? "100%" : 0 }}
        onLoad={() => setIsLoadImg(true)}
      />
      <p>{title}</p>
      <span>{chanel}</span>
      <span>786 тыс. просмотров</span>
    </a>
  );
};

export default GridVideoItem;
