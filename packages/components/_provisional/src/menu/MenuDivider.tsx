import React from "react";
import styles from "./styles/menu-divider.module.scss";
import classNames from "classnames";
import { Avatar, type AvatarProps } from "../avatar";

export interface MenuDividerProps extends React.HTMLAttributes<HTMLSpanElement> {
  image: AvatarProps["image"];
  label: AvatarProps["name"];
}

export const MenuDivider = ({
  image,
  label,
  className,
  ...otherProps
}: Readonly<MenuDividerProps>): React.ReactElement => (
  <span className={classNames(styles.root, className)} {...otherProps}>
    <Avatar name={label} image={image} />
    ssss
  </span>
);
