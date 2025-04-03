import React from "react";
import classNames from "classnames";
import { Skeleton } from "./Skeleton";
import { Table, type TableProps } from "../table";

/**
 * Props for configuring the SkeletonTable component
 */
interface SkeletonTableProps extends Omit<TableProps, "children"> {
  /** Number of rows to display in the skeleton table. Defaults to 3 */
  rowCount?: number;
  /** Number of columns to display in the skeleton table. Defaults to 4 */
  columnCount?: number;
}

/**
 * A skeleton table component that displays a loading placeholder in a table format
 * Uses composition with the base Skeleton component to create a table-like structure
 */
export const SkeletonTable = ({
  rowCount = 3,
  columnCount = 4,
  className,
  ...otherProps
}: Readonly<SkeletonTableProps>): React.ReactElement => (
  <Skeleton variation="content">
    <Table className={classNames(className)} {...otherProps}>
      {Array.from({ length: rowCount }).map(() => (
        <Table.Tr key={`skeleton-row-${crypto.randomUUID()}`}>
          {Array.from({ length: columnCount }).map(() => (
            <Table.Td key={`skeleton-cell-${crypto.randomUUID()}`}>
              <Skeleton variation="text" />
            </Table.Td>
          ))}
        </Table.Tr>
      ))}
    </Table>
  </Skeleton>
);
