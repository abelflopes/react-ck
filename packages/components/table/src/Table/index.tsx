import React, { useMemo } from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import { ScrollableContainer } from "@react-ck/provisional";
import { Th } from "../Th";
import { Td } from "../Td";
import { THead } from "../THead";
import { TBody } from "../TBody";
import { TFoot } from "../TFoot";
import { Tr } from "../Tr";
import { TableContext, type TableContextProps } from "../context";

type TableProps = React.HTMLAttributes<HTMLDivElement> & TableContextProps;

/**
 * Table is an element that visualizes a data set in rows and columns. It’s often used to embed structured data in a way that’s easy to scan.
 * @param props - {@link TableProps}
 * @returns a React element
 */

const Table = ({
  skin = "default",
  scrollable = false,
  className,
  children,
  ...otherProps
}: Readonly<TableProps>): React.ReactElement => {
  const contextValue = useMemo<TableContextProps>(
    () => ({
      skin,
      scrollable,
    }),
    [skin, scrollable],
  );

  return (
    <TableContext.Provider value={contextValue}>
      {scrollable ? (
        <ScrollableContainer
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
        </ScrollableContainer>
      ) : null}

      {!scrollable && (
        <div
          {...otherProps}
          className={classNames(
            styles.root,
            {
              [`${styles[skin]}`]: skin !== "default",
            },
            className,
          )}>
          <table className={styles.table}>{children}</table>
        </div>
      )}
    </TableContext.Provider>
  );
};

Table.Th = Th;
Table.Td = Td;
Table.Tr = Tr;
Table.Thead = THead;
Table.TBody = TBody;
Table.TFoot = TFoot;

export { Table, type TableProps };
