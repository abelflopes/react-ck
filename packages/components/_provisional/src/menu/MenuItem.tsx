import * as styles from "./styles/menu-item.module.scss";
import React from "react";
import classNames from "classnames";

export interface MenuItemProps extends React.HTMLAttributes<HTMLElement> {
  selected?: boolean;
  highlighted?: boolean;
  icon?: NonNullable<React.ReactNode>;
  disabled?: boolean;
}

export const MenuItem = ({
  icon,
  selected,
  highlighted,
  disabled,
  className,
  children,
  ...otherProps
}: Readonly<MenuItemProps>): React.ReactElement => (
  <li
    className={classNames(
      styles.root,
      {
        [`${styles.disabled}`]: disabled,
        [`${styles.selected}`]: selected,
        [`${styles.highlighted}`]: highlighted,
      },
      className,
    )}
    {...otherProps}>
    {icon}
    {children}
  </li>
);
