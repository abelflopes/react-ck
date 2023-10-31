import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  skin?: "primary" | "secondary";
  icon?: React.ReactNode;
}

export const Button = ({
  skin = "primary",
  icon,
  children,
  className,
  ...otherProps
}: Readonly<ButtonProps>): React.ReactElement => (
  <button className={classNames(styles.root, styles[skin], className)} {...otherProps}>
    {icon && <span className={styles.icon}>{icon}</span>}
    {children}
  </button>
);
