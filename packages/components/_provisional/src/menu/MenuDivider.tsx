import * as styles from "./styles/menu-divider.module.scss";
import React from "react";
import classNames from "classnames";

export interface MenuDividerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Passing a children will render a labeled separator, while omitting children will render a simple line separator */
  children?: React.ReactNode;
}

export const MenuDivider = ({
  className,
  children,
  ...otherProps
}: Readonly<MenuDividerProps>): React.ReactElement => (
  <span className={classNames(styles.root, children && styles.text, className)} {...otherProps}>
    {children}
  </span>
);
