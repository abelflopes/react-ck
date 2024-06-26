import React from "react";
import styles from "./styles/item.module.scss";
import classNames from "classnames";

export type SnackbarItemProps = React.HTMLAttributes<HTMLDivElement>;

export const SnackbarItem = ({
  className,
  ...otherProps
}: Readonly<SnackbarItemProps>): React.ReactElement => (
  <div className={classNames(styles.root, className)} {...otherProps} />
);
