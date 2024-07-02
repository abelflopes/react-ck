import styles from "./styles/menu-divider.module.scss";
import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./context";

export interface MenuDividerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Passing a children will render a labeled separator, while omitting children will render a simple line separator */
  children?: React.ReactNode;
}

export const MenuDivider = ({
  className,
  children,
  ...otherProps
}: Readonly<MenuDividerProps>): React.ReactElement => {
  const menuContext = useContext(MenuContext);

  return (
    <span
      className={classNames(
        styles.root,
        children && styles.text,
        styles[menuContext.variation],
        className,
      )}
      {...otherProps}>
      {children}
    </span>
  );
};
