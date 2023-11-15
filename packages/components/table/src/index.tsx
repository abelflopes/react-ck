import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  /** Specifies the visual style of the table  */
  skin?: "default" | "bordered";
}

/**
 * Table is an element that visualizes a data set in rows and columns. It’s often used to embed structured data in a way that’s easy to scan.
 * @param props - {@link OverlayProps}
 * @returns a React element
 */

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
