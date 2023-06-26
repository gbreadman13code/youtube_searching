import React, { useEffect, useState } from "react";

import Container from "../../elements/Container/Container";
import PageTemplate from "../../elements/PageTemplate/PageTemplate";

import { useSelector } from "react-redux";
import FavoriteItem, { Query } from "../../elements/FavoriteItem/FavoriteItem";

import styles from "./FavoritesPaige.module.scss";

const FavoritesPaige = () => {
  const [emptyArray, setEmptyArray] = useState(false);
  const [favorite_queries, setFavorite_queries] = useState<Query[]>([]);
  const [paddingTop, setPaddingTop] = useState(73);

  const current_user = useSelector((state: any) => state.isAuth.user);

  const headerHeight = document.querySelector("header");

  useEffect(() => {
    if (!headerHeight) return;
    setPaddingTop(headerHeight.clientHeight);
  }, [headerHeight]);

  const checkLocalStorage = () => {
    const favorite_queries_from_storage = window.localStorage.getItem(
      `favorite_queries_by_${current_user}`
    );
    if (!favorite_queries_from_storage) {
      setEmptyArray(true);
      return;
    }

    setFavorite_queries(JSON.parse(favorite_queries_from_storage));
  };

  useEffect(() => {
    checkLocalStorage();
  }, []);

  const deleteFavoriteItem = (id: number) => {
    const items = window.localStorage.getItem(
      `favorite_queries_by_${current_user}`
    );
    if (!items) return;
    const arrayWithoutDeletedItem = JSON.parse(items).filter(
      (item: Query) => +item.id !== id
    );
    if (arrayWithoutDeletedItem.length < 1) {
      window.localStorage.removeItem(`favorite_queries_by_${current_user}`);
      setFavorite_queries([]);
    } else {
      window.localStorage.setItem(
        `favorite_queries_by_${current_user}`,
        JSON.stringify(arrayWithoutDeletedItem)
      );
    }
    checkLocalStorage();
  };

  return (
    <PageTemplate>
      <section
        className={styles.search_page_wrapper}
        style={{ paddingTop: paddingTop }}
      >
        <Container>
          <div className={styles.favorite_page}>
            <h1>Избранное</h1>
            {emptyArray && (
              <p>
                Упс... Ваш список избранного пуст. <br /> Добавьте сюда
                результаты поиска, кликнув на 💙 <br /> И мы сохраним их для
                вас.
              </p>
            )}
            <div className={styles.favorite_list}>
              {favorite_queries.length > 0 &&
                favorite_queries.map((point, index) => (
                  <FavoriteItem
                    key={index}
                    params={point.params}
                    url={point.url}
                    id={point.id}
                    deleteItem={deleteFavoriteItem}
                    refreshStorage={checkLocalStorage}
                  />
                ))}
            </div>
          </div>
        </Container>
      </section>
    </PageTemplate>
  );
};

export default FavoritesPaige;
