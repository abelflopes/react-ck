import styles from "./styles/icon.module.scss";
import React from "react";
import { IconCheck } from "@react-ck/icon/icons/IconCheck";
import { Icon } from "@react-ck/icon";
import { type BooleanInputIconComponent } from "../boolean-input";

export const CheckboxIconDefault: BooleanInputIconComponent = () => (
  <span className={styles.root}>
    <Icon className={styles.icon} size="m">
      <IconCheck />
    </Icon>
  </span>
);
