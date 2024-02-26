import React from "react";
import styles from "./styles/item.module.scss";
import classNames from "classnames";

export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLElement> {
  active?: boolean;
}

export const BreadcrumbItem = ({
  active,
  className,
  children,
  ...otherProps
}: Readonly<BreadcrumbItemProps>): React.ReactElement => (
  <span className={classNames(styles.root, active && styles.active, className)} {...otherProps}>
    {children}
  </span>
);
