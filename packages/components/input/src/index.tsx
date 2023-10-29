import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: never;
}

export const Input = ({ className, ...props }: Readonly<InputProps>): React.ReactElement => (
  <input {...props} className={classNames(className, styles.root)} />
);
