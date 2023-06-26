import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { currentQueryAction } from "../../../redux/videoReducer";
import { getVideos } from "../../../queries/getVideos";

import styles from "./FavoriteItem.module.scss";

import SafeQueryModal from "../SafeQueryModal/SafeQueryModal";
import { ReactComponent as ThreeCircles } from "../../../assets/img/mobile-options.svg";

export type Query = {
  params: Params;
  url: string;
  id: string;
  deleteItem?: (id: number) => void;
  refreshStorage?: () => void;
};

type Params = {
  name: string;
  keywords: string;
  sortedBy: string;
  resultsCount: number;
};

const FavoriteItem = ({
  params,
  url,
  id,
  deleteItem,
  refreshStorage,
}: Query) => {
  const [isShowModal, setShowModal] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [isOpenSettings, setOpenSettings] = useState(false);
  const resize = () => {
    if (document.body.clientWidth <= 768) setMobile(true);
    if (document.body.clientWidth > 768) setMobile(false);
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const searchClickHandler = () => {
    const queryText = params.keywords.replaceAll(" ", "+");

    getVideos(queryText, dispatch, url);

    dispatch(currentQueryAction(params.keywords));

    navigation(`/search/results/${queryText}`);
  };

  return (
    <div className={styles.favorite_item}>
      {isShowModal && (
        <SafeQueryModal
          queryText={params.keywords}
          closeHandler={() => setShowModal(false)}
          currentQuery={{ params, url, id }}
          editable={true}
          refreshStorage={refreshStorage}
        />
      )}

      <h3 onClick={searchClickHandler}>{params.name}</h3>
      {isMobile && (
        <ThreeCircles onClick={() => setOpenSettings((prev) => !prev)} />
      )}
      {isMobile ? (
        isOpenSettings && (
          <div className={styles.query_control}>
            <span
              onClick={() => {
                setOpenSettings(false);
                setShowModal(true);
              }}
            >
              Изменить
            </span>
            <span
              onClick={() => {
                setOpenSettings(false);
                deleteItem && deleteItem(+id);
              }}
            >
              Удалить
            </span>
          </div>
        )
      ) : (
        <div className={styles.query_control}>
          <span onClick={() => setShowModal(true)}>Изменить</span>
          <span onClick={() => deleteItem && deleteItem(+id)}>Удалить</span>
        </div>
      )}
    </div>
  );
};

export default FavoriteItem;
