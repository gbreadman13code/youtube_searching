import React from "react";

import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthAction } from "../../../redux/authReducer";

import styles from "./Header.module.scss";

import Container from "../Container/Container";
import Logo from "../Logo/Logo";

const Header = () => {
  const dispatch = useDispatch();

  const logout = () => {
    window.localStorage.removeItem("sibdev-youtube-token");
    dispatch(setAuthAction({ user: "", isAuth: false }));
  };
  return (
    <header className={styles.header_wrapper}>
      <Container>
        <div className={styles.header_container}>
          <div>
            <Logo />
            <NavLink
              className={({ isActive }) =>
                styles.nav_link + " " + (isActive ? styles.active : "")
              }
              to={"/search"}
            >
              Поиск
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                styles.nav_link + " " + (isActive ? styles.active : "")
              }
              to={"/favorites"}
            >
              Избранное
            </NavLink>
          </div>
          <button onClick={logout}>Выйти</button>
        </div>
      </Container>
    </header>
  );
};

export default Header;
