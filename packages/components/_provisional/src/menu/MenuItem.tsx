import React from "react";
import { Button, type ButtonProps } from "@react-ck/button";
import styles from "./styles/menu-item.module.scss";
import classNames from "classnames";

export interface MenuItemProps extends Omit<ButtonProps, "children" | "skin" | "icon"> {
  icon: NonNullable<React.ReactNode>;
  active: boolean;
}

export const MenuItem = ({
  icon,
  active,
  className,
  ...otherProps
}: Readonly<MenuItemProps>): React.ReactElement => (
  <Button
    className={classNames(styles.root, className)}
    skin={active ? "primary" : "ghost"}
    icon={icon}
    {...otherProps}>
    sss{" "}
  </Button>
);
