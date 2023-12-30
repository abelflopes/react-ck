import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Disallow usage of react children */
  children?: never;
}

/**
 * Input is a form element that accepts a single line of text.
 * @param props - {@link InputProps}
 * @returns a React element
 */

export const Input = ({ className, ...props }: Readonly<InputProps>): React.ReactElement => (
  <input {...props} className={classNames(className, styles.root)} />
);
