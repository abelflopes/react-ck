import React from "react";
import classNames from "classnames";
import { Skeleton } from "./Skeleton";
import { Table, type TableProps } from "../table";
import { Card } from "../card";

/**
 * Props for configuring the SkeletonTable component
 */
interface SkeletonTableProps extends Omit<TableProps, "children"> {
  /** Number of rows to display in the skeleton table. Defaults to 3 */
  rows?: number;
  /** Number of columns to display in the skeleton table. Defaults to 4 */
  columns?: number;
}

/**
 * A skeleton table component that displays a loading placeholder in a table format
 * Uses composition with the base Skeleton component to create a table-like structure
 */
export const SkeletonTable = ({
  rows = 3,
  columns = 4,
  className,
  ...otherProps
}: Readonly<SkeletonTableProps>): React.ReactElement => (
  <Card>
    <Table className={classNames(className)} {...otherProps}>
      <Table.TBody>
        {Array.from({ length: rows }).map(() => (
          <Table.Tr key={`skeleton-row-${crypto.randomUUID()}`}>
            {Array.from({ length: columns }).map(() => (
              <Table.Td key={`skeleton-cell-${crypto.randomUUID()}`}>
                <Skeleton variation="text" />
              </Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.TBody>
    </Table>
  </Card>
);
