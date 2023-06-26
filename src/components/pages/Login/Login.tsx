import React, { useEffect, useState } from "react";

import Logo from "../../elements/Logo/Logo";
import TextInput from "../../elements/TextInput/TextInput";
import PasswordInput from "../../elements/PasswordInput/PasswordInput";
import Button from "../../elements/Button/Button";

import { useDispatch, useSelector } from "react-redux";
import { setAuthAction } from "../../../redux/authReducer";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.scss";

type UserType = {
  gmail: string;
  password: string;
};

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const authRedux = useSelector((state: any) => state.isAuth.isAuth);

  useEffect(() => {
    if (authRedux) navigation("/search");
  }, [authRedux]);

  const signInHandler = () => {
    setEmailError(false);
    setPasswordError(false);
    let users = require("../../../users.json");
    let loginedUser = users.find((user: UserType) => user.gmail === userName);

    if (loginedUser) {
      if (loginedUser.password === password) {
        const tokenGenerator = require("generate-token");
        let token = tokenGenerator.generate(50);

        window.localStorage.setItem(
          "sibdev-youtube-token",
          JSON.stringify({ user: userName, token: token })
        );
        dispatch(setAuthAction({ user: userName, isAuth: true }));

        return;
      } else {
        setPasswordError(true);
        return;
      }
    } else {
      setEmailError(true);
      return;
    }
  };

  return (
    <section className={styles.loginpage_wrapper}>
      <div className={styles.login_modal}>
        <Logo />
        <h2>Вход</h2>
        <div className={styles.errors_block}>
          {emailError && <p>E-mail не найден</p>}
          {passwordError && <p>Неверный пароль</p>}
        </div>

        <div className={styles.text_input_wrapper}>
          <TextInput
            label="Логин"
            onChangeHandler={setUserName}
            value={userName}
          />
        </div>
        <div className={styles.password_input_wrapper}>
          <PasswordInput label="Пароль" onChangeHandler={setPassword} />
        </div>
        <Button text="Войти" onClickHandler={signInHandler} />
      </div>
    </section>
  );
};

export default Login;
