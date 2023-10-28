import React from "react";
import styles from "./index.module.scss";

export const Button = (): React.ReactElement => (
  <button type="button" className={styles.root}>
    Some button
  </button>
);
