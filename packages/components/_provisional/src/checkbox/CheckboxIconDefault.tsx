import styles from "./styles/icon.module.scss";
import React from "react";
import { IconCheck } from "@react-ck/icon/icons/IconCheck";
import { Icon } from "@react-ck/icon";
import classNames from "classnames";
import { type BooleanInputIconComponent } from "../boolean-input";

export const CheckboxIconDefault: BooleanInputIconComponent = ({ checked }) => (
  <span
    className={classNames(styles.root, {
      [`${styles.checked}`]: checked,
    })}>
    <Icon className={styles.icon}>
      <IconCheck />
    </Icon>
  </span>
);
