import React, { ReactNode } from "react";

import Header from "../Header/Header";

import styles from "./PageTemplate.module.scss";

type Children = {
  children: ReactNode;
};

const PageTemplate = ({ children }: Children) => {
  return (
    <div className={styles.template_wrapper}>
      <Header />
      {children}
    </div>
  );
};

export default PageTemplate;
