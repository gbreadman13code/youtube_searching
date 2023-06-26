import React, { useEffect, useState } from "react";

import Container from "../../elements/Container/Container";
import TextInput from "../../elements/TextInput/TextInput";
import Button from "../../elements/Button/Button";
import SafeQueryModal from "../../elements/SafeQueryModal/SafeQueryModal";
import PageTemplate from "../../elements/PageTemplate/PageTemplate";
import GridVideoList from "../../elements/GridVideoList/GridVideoList";
import ListVideoList from "../../elements/ListVideoList/ListVideoList";

import { ReactComponent as GridIcon } from "../../../assets/img/grid.svg";
import { ReactComponent as ListIcon } from "../../../assets/img/list.svg";
import { ReactComponent as LikeIcon } from "../../../assets/img/heart.svg";

import { NavLink, useNavigate } from "react-router-dom";
import { VideoResultsType } from "../../../types";
import { useAppDispatch } from "../../../redux/hooks";
import { getVideos } from "../../../queries/getVideos";
import { currentQueryAction } from "../../../redux/videoReducer";
import { useSelector } from "react-redux";

import styles from "./ResultsPaige.module.scss";

const ResultsPaige = () => {
  const videosRedux = useSelector((state: any) => state.videos.videos);
  const query = useSelector((state: any) => state.videos.current_query);

  const [searchField, setSearchField] = useState("");
  const [videos, setVideos] = useState<VideoResultsType>();
  const [currentQuery, setCurrentQuery] = useState("");
  const [paddingTop, setPaddingTop] = useState(73);
  const [listType, setListType] = useState("list");
  const [isShowModal, setShowModal] = useState(false);
  const [isMobile, setMobile] = useState(false);

  const [savedLike, setSavedLike] = useState(false);

  const navigation = useNavigate();

  const resize = () => {
    if (document.body.clientWidth <= 768) setMobile(true);
    if (document.body.clientWidth > 768) setMobile(false);
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (!query) {
      navigation("/search");
      return;
    }
    setSearchField(query);
    setCurrentQuery(query);
  }, [query]);

  useEffect(() => {
    if (!savedLike) return;
    const timer = setTimeout(() => {
      setSavedLike(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [savedLike]);

  useEffect(() => {
    setVideos(videosRedux);
  }, [videosRedux]);

  const headerHeight = document.querySelector("header");

  useEffect(() => {
    if (!headerHeight) return;
    setPaddingTop(headerHeight.clientHeight);
  }, [headerHeight]);

  const dispatch = useAppDispatch();

  const searchClickHandler = () => {
    if (searchField === "") return;
    const queryText = searchField.replaceAll(" ", "+");
    getVideos(queryText, dispatch);

    dispatch(currentQueryAction(searchField));

    navigation(`/search/results/${queryText}`);
  };

  return (
    <PageTemplate>
      <section
        className={styles.search_page_wrapper}
        style={{ paddingTop: paddingTop }}
      >
        {isShowModal && (
          <SafeQueryModal
            queryText={query}
            closeHandler={() => setShowModal(false)}
            success={() => setSavedLike(true)}
          />
        )}
        <Container>
          <div className={styles.result_page}>
            <h1>Поиск видео</h1>
            <div className={styles.search_block}>
              <div className={styles.liked_input_wrapper}>
                <TextInput
                  onChangeHandler={setSearchField}
                  placeholder="Что хотите посмотреть?"
                  // defaultValue={currentQuery}
                  value={searchField}
                  nonSeparate
                />
                <div className={savedLike ? styles.saved_like : styles.like}>
                  <LikeIcon onClick={() => setShowModal(true)} />
                  {savedLike && (
                    <div>
                      <span>Поиск сохранён в разделе «Избранное»</span>
                      <NavLink to={"/favorites"}>Перейти в избранное</NavLink>
                    </div>
                  )}
                </div>
              </div>

              <Button
                text="Найти"
                onClickHandler={searchClickHandler}
                nonSeparate
              />
            </div>
            <div className={styles.control_panel}>
              <p>
                Видео по запросу <strong>«{currentQuery}»</strong>{" "}
                {!isMobile &&
                  (videos?.pageInfo?.totalResults === 1000000 ? (
                    <span> | Более миллиона результатов</span>
                  ) : (
                    <span>| {videos?.pageInfo?.totalResults} результатов</span>
                  ))}
              </p>
              <div className={styles.list_type}>
                <div
                  onClick={() => setListType("list")}
                  className={listType === "list" ? styles.active : ""}
                >
                  <ListIcon />
                </div>
                <div
                  onClick={() => setListType("grid")}
                  className={listType === "grid" ? styles.active : ""}
                >
                  <GridIcon />
                </div>
              </div>
            </div>
            {isMobile &&
              (videos?.pageInfo?.totalResults === 1000000 ? (
                <span>Более миллиона результатов</span>
              ) : (
                <span> {videos?.pageInfo?.totalResults} результатов</span>
              ))}
            {videos &&
              (listType === "grid" ? (
                <GridVideoList videos={videos.items} />
              ) : (
                <ListVideoList videos={videos.items} />
              ))}
          </div>
        </Container>
      </section>
    </PageTemplate>
  );
};

export default ResultsPaige;
