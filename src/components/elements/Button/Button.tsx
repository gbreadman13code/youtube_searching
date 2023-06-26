import React from "react";
import styles from "./Button.module.scss";

type ButtonPropType = {
  text: string;
  nonSeparate?: boolean;
  onClickHandler: () => void;
  color?: string;
};

const Button = ({
  text,
  nonSeparate,
  onClickHandler,
  color,
}: ButtonPropType) => {
  return (
    <button
      className={styles.button + " " + (nonSeparate ? styles.non_separate : "")}
      onClick={onClickHandler}
      style={
        color && color === "light"
          ? {
              background: "#fff",
              color: "#1390e5",
              border: "1px solid #1390e5",
            }
          : {}
      }
    >
      {text}
    </button>
  );
};

export default Button;
