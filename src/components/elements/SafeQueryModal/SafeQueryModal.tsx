import React, { useEffect, useState } from "react";

import Button from "../Button/Button";

import { useSelector } from "react-redux";
import { Query } from "../FavoriteItem/FavoriteItem";
import { API_KEY } from "../../../API_KEY";

import styles from "./SafeQueryModal.module.scss";

type ModalPropType = {
  queryText: string;
  editable?: boolean;
  currentQuery?: Query;
  closeHandler: () => void;
  refreshStorage?: () => void;
  success?: () => void;
};

const SafeQueryModal = ({
  queryText,
  closeHandler,
  editable,
  currentQuery,
  refreshStorage,
  success,
}: ModalPropType) => {
  const [queryKeywords, setQueryKeyWords] = useState(queryText);
  const [queryName, setQueryName] = useState("");
  const [maxResultsCount, setMaxResultsCount] = useState(12);
  const [errorQueryName, setErrorQueryName] = useState(false);
  const [sortedType, setSortedType] = useState("order=relevance");

  const current_user = useSelector((state: any) => state.isAuth.user);

  const textInputChangeHandler = (num: number) => {
    let localNum = num;
    if (num > 50) localNum = 50;
    if (num < 1) localNum = 1;
    setMaxResultsCount(localNum);
  };
  useEffect(() => {
    if (!currentQuery) return;
    setQueryName(currentQuery.params.name);
    setSortedType(currentQuery.params.sortedBy);
    setMaxResultsCount(currentQuery.params.resultsCount);
    setQueryKeyWords(currentQuery.params.keywords);
  }, [currentQuery]);

  useEffect(() => {
    if (!errorQueryName) return;
    const timer = setTimeout(() => {
      setErrorQueryName(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [errorQueryName]);

  const safeQueryHandler = () => {
    if (!queryName) {
      setErrorQueryName(true);
      return;
    }
    const favoriteObj = {
      name: queryName,
      keywords: queryText,
      sortedBy: sortedType,
      resultsCount: maxResultsCount,
    };

    const modified_keywords = queryText.replaceAll(" ", "+");

    const user_favorite_query = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${modified_keywords}&${favoriteObj.sortedBy}&maxResults=${favoriteObj.resultsCount}&part=snippet&type=video`;

    const isInStorage = window.localStorage.getItem(
      `favorite_queries_by_${current_user}`
    );

    const id = Date.now();

    if (!isInStorage) {
      window.localStorage.setItem(
        `favorite_queries_by_${current_user}`,
        JSON.stringify([
          { id: id, params: favoriteObj, url: user_favorite_query },
        ])
      );
    } else {
      const favorite_queries = JSON.parse(isInStorage);
      window.localStorage.setItem(
        `favorite_queries_by_${current_user}`,
        JSON.stringify([
          ...favorite_queries,
          { id: id, params: favoriteObj, url: user_favorite_query },
        ])
      );
    }

    closeHandler();
    success && success();
  };

  const changeQueryHandler = () => {
    if (!currentQuery) return;
    if (!queryName) {
      setErrorQueryName(true);
      return;
    }
    const favoriteObj = {
      name: queryName,
      keywords: queryKeywords,
      sortedBy: sortedType,
      resultsCount: maxResultsCount,
    };

    const modified_keywords = queryText.replaceAll(" ", "+");

    const user_favorite_query = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${modified_keywords}&${favoriteObj.sortedBy}&maxResults=${favoriteObj.resultsCount}&part=snippet&type=video`;

    const isInStorage = window.localStorage.getItem(
      `favorite_queries_by_${current_user}`
    );
    if (isInStorage) {
      const arrayWithEditingItem = JSON.parse(isInStorage).map(
        (item: Query) => {
          if (item.id === currentQuery.id) {
            return {
              id: item.id,
              params: favoriteObj,
              url: user_favorite_query,
            };
          } else {
            return item;
          }
        }
      );
      window.localStorage.setItem(
        `favorite_queries_by_${current_user}`,
        JSON.stringify(arrayWithEditingItem)
      );
    }
    refreshStorage && refreshStorage();
    closeHandler();
  };

  return (
    <div className={styles.modal_wrapper}>
      <div className={styles.modal}>
        <h3>{editable ? "Изменить запрос" : "Сохранить запрос"}</h3>
        <div>
          <label htmlFor="query">Запрос</label>
          <input
            type="text"
            id="query"
            value={queryKeywords}
            onChange={(e) => setQueryKeyWords(e.target.value)}
            disabled={!editable}
          />
        </div>
        <div>
          <label htmlFor="queryName">
            <span>*</span> Название
          </label>
          <input
            type="text"
            id="queryName"
            value={queryName}
            className={errorQueryName ? styles.errorQueryName : ""}
            onChange={(e) => setQueryName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="sorted">Сортировать по</label>
          <select
            name="sotred_by"
            id="sorted"
            placeholder="Без сортировки"
            onChange={(e) => setSortedType(e.target.value)}
            value={sortedType}
          >
            <option defaultChecked value="order=relevance">
              По релевантности (по умолчанию)
            </option>
            <option value="order=title">По алфавиту</option>
            <option value="order=viewCount">По количеству просмотров</option>
            <option value="order=date">По дате загрузки</option>
            <option value="order=rating">По рейтингу</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Максимальное количество</label>
          <div className={styles.range_wrapper}>
            <input
              type="range"
              min="1"
              max="50"
              value={maxResultsCount}
              onChange={(e) => textInputChangeHandler(+e.target.value)}
            />
            <input
              type="text"
              name=""
              id=""
              value={maxResultsCount}
              onChange={(e) => textInputChangeHandler(+e.target.value)}
            />
          </div>
        </div>
        <div className={styles.btn_group}>
          <Button
            text="Не сохранять"
            onClickHandler={closeHandler}
            color="light"
          />
          <Button
            text="Сохранить"
            onClickHandler={editable ? changeQueryHandler : safeQueryHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default SafeQueryModal;
