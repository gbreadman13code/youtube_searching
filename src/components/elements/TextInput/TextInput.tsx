import React from "react";
import styles from "./TextInput.module.scss";

type TextInputPropType = {
  label?: string;
  placeholder?: string;
  onChangeHandler: (value: string) => void;
  nonSeparate?: boolean;
  value: string;
};

const TextInput = ({
  label,
  onChangeHandler,
  placeholder,
  nonSeparate,
  value,
}: TextInputPropType) => {
  return (
    <div className={styles.input_wrapper}>
      {label && <label>{label}</label>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChangeHandler(e.target.value)}
        autoComplete="off"
        placeholder={placeholder}
        className={nonSeparate ? styles.non_separate : ""}
      />
    </div>
  );
};

export default TextInput;
