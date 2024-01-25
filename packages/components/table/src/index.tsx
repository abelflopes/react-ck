import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Specifies the visual style of the table  */
  skin?: "default" | "bordered";
  /** Allows container to be scrollable and adds sticky headers  */
  scrollable?: boolean;
}

/**
 * Table is an element that visualizes a data set in rows and columns. It’s often used to embed structured data in a way that’s easy to scan.
 * @param props - {@link TableProps}
 * @returns a React element
 */

export const Table = ({
  skin = "default",
  className,
  children,
  scrollable,
  ...otherProps
}: Readonly<TableProps>): React.ReactElement => (
  <div
    {...otherProps}
    className={classNames(
      styles.root,
      {
        [`${styles.scrollable}`]: scrollable,
        [`${styles[skin]}`]: skin !== "default",
      },
      className,
    )}>
    <table className={styles.table}>{children}</table>
  </div>
);
