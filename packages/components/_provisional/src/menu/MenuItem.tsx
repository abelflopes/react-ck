import styles from "./styles/menu-item.module.scss";
import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./context";

export interface MenuItemProps extends React.HTMLAttributes<HTMLElement> {
  skin?: "default" | "primary" | "secondary" | "disabled";
  icon?: NonNullable<React.ReactNode>;
}

export const MenuItem = ({
  skin = "default",
  icon,
  className,
  children,
  ...otherProps
}: Readonly<MenuItemProps>): React.ReactElement => {
  const menuContext = useContext(MenuContext);

  return (
    <li
      className={classNames(
        styles.root,
        skin !== "default" && styles[skin],
        styles[menuContext.variation],
        className,
      )}
      {...otherProps}>
      {icon}
      {children}
    </li>
  );
};
