import React from "react";
import styles from "./styles/toggle.module.scss";
import { type BooleanInputIconComponent } from "../boolean-input";

export const ToggleIcon: BooleanInputIconComponent = () => (
  <div className={styles.root}>
    <div className={styles.track}>
      <div className={styles.thumb} />
    </div>
  </div>
);
