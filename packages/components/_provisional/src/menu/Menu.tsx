import styles from "./styles/menu.module.scss";
import classNames from "classnames";
import React from "react";
import { MenuItem } from "./MenuItem";
import { MenuDivider } from "./MenuDivider";

interface MenuProps extends React.HTMLAttributes<HTMLElement> {
  expanded?: boolean;
}

// TODO: add a11y https://react.dev/reference/react-dom/createPortal#rendering-a-dock-dialog-with-a-portal
// TODO: keyboard nav / focus

const Menu = ({ children, className, ...otherProps }: Readonly<MenuProps>): React.ReactNode => (
  <ul className={classNames(styles.root, className)} {...otherProps}>
    {children}
  </ul>
);

Menu.Item = MenuItem;

Menu.Divider = MenuDivider;

export { Menu, type MenuProps };
