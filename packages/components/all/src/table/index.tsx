import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  skin?: "default" | "bordered";
}

export const Table = ({
  skin = "default",
  className,
  children,
  ...otherProps
}: Readonly<TableProps>): React.ReactElement => (
  <table
    className={classNames(
      styles.root,
      {
        [`${styles[skin]}`]: skin !== "default",
      },
      className,
    )}
    {...otherProps}>
    {children}
  </table>
);
