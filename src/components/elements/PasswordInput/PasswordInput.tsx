import React, { useEffect, useState } from "react";
import styles from "./PasswordInput.module.scss";

import { ReactComponent as EyeOffIcon } from "../../../assets/img/eye-off_disactive.svg";
import { ReactComponent as EyeOnIcon } from "../../../assets/img/eye-on.svg";

type PasswordInputPropType = {
  label: string;
  onChangeHandler: (value: string) => void;
};

const PasswordInput = ({ label, onChangeHandler }: PasswordInputPropType) => {
  const [value, setValue] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    onChangeHandler(value);
  }, [value]);

  return (
    <div className={styles.input_wrapper}>
      <label>{label}</label>
      <input
        type={isPasswordVisible ? "text" : "password"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div
        className={styles.eye_icon}
        onClick={() => setPasswordVisible((prev) => !prev)}
      >
        {isPasswordVisible ? <EyeOnIcon /> : <EyeOffIcon />}
      </div>
    </div>
  );
};

export default PasswordInput;
