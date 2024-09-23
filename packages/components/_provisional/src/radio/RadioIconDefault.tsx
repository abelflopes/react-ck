import styles from "./styles/icon.module.scss";
import React from "react";
import { type BooleanInputIconComponent } from "../boolean-input";

export const RadioIconDefault: BooleanInputIconComponent = () => (
  <span className={styles.root}>
    <span className={styles.icon} />
  </span>
);
