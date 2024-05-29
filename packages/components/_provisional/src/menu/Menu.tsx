import classNames from "classnames";
import styles from "./styles/menu.module.scss";
import React from "react";
import { MenuItem } from "./MenuItem";
import { MenuDivider } from "./MenuDivider";

interface MenuProps extends React.HTMLAttributes<HTMLElement> {
  expanded?: boolean;
}

// TODO: add a11y https://react.dev/reference/react-dom/createPortal#rendering-a-dock-dialog-with-a-portal

const Menu = ({ children, className, ...otherProps }: Readonly<MenuProps>): React.ReactNode => (
  <nav className={classNames(styles.root, className)} {...otherProps}>
    {children}
  </nav>
);

Menu.Item = MenuItem;

Menu.MainItem = MenuDivider;

export { Menu, type MenuProps };
