import styles from "./styles/icon.module.scss";
import React from "react";
import classNames from "classnames";
import { type BooleanInputIconComponent } from "../boolean-input";

export const RadioIconDefault: BooleanInputIconComponent = ({ checked }) => (
  <span
    className={classNames(styles.root, {
      [`${styles.checked}`]: checked,
    })}>
    <span className={styles.icon} />
  </span>
);
