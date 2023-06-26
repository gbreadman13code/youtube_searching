import React, { useEffect, useState } from "react";

import SearchPaige from "../SearchPaige/SearchPaige";
import FavoritesPaige from "../FavoritesPaige/FavoritesPaige";
import ResultsPaige from "../ResultsPaige/ResultsPaige";
import Login from "../Login/Login";

import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { setAuthAction } from "../../../redux/authReducer";

const MainPaige = () => {
  const [isAuth, setAuth] = useState(false);

  const authRedux = useSelector((state: any) => state.isAuth.isAuth);
  const dispatch = useDispatch();

  const navigation = useNavigate();

  useEffect(() => {
    const isToken: any = window.localStorage.getItem("sibdev-youtube-token");

    if (!isToken) return;
    const user = JSON.parse(isToken).user;
    dispatch(setAuthAction({ user: user, isAuth: true }));
  }, []);

  useEffect(() => {
    setAuth(authRedux);
  }, [authRedux]);

  useEffect(() => {
    if (!isAuth) navigation("/login");
  }, [isAuth]);

  return (
    <Routes>
      <Route path="/search" element={<SearchPaige />} />
      <Route path="/search/results/:query" element={<ResultsPaige />} />
      <Route path="/favorites" element={<FavoritesPaige />} />

      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default MainPaige;
