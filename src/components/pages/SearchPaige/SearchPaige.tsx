import React, { useState } from "react";

import Container from "../../elements/Container/Container";
import TextInput from "../../elements/TextInput/TextInput";
import PageTemplate from "../../elements/PageTemplate/PageTemplate";
import Button from "../../elements/Button/Button";

import { getVideos } from "../../../queries/getVideos";
import { useAppDispatch } from "../../../redux/hooks";
import { currentQueryAction } from "../../../redux/videoReducer";
import { useNavigate } from "react-router-dom";

import styles from "./SearchPaige.module.scss";

const SearchPaige = () => {
  const [searchField, setSearchField] = useState("");

  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const searchClickHandler = () => {
    if (searchField === "") return;
    const queryText = searchField.replaceAll(" ", "+");
    getVideos(queryText, dispatch);

    dispatch(currentQueryAction(searchField));

    navigation(`/search/results/${queryText}`);
  };

  return (
    <PageTemplate>
      <section className={styles.search_page_wrapper}>
        <Container>
          <div className={styles.search_page}>
            <h1>Поиск видео</h1>
            <div className={styles.search_block_wrapper}>
              <TextInput
                onChangeHandler={setSearchField}
                placeholder="Что хотите посмотреть?"
                value={searchField}
                nonSeparate
              />
              <Button
                text="Найти"
                onClickHandler={searchClickHandler}
                nonSeparate
              />
            </div>
          </div>
        </Container>
      </section>
    </PageTemplate>
  );
};

export default SearchPaige;
