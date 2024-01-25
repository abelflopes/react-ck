import React, { useMemo } from "react";
import { Table, type TableProps } from "@react-ck/table";
import * as CC from "change-case";

// TODO: add pagination
// TODO: add section table

/** Type representing the data structure for the DataTable component  */
type TableData = Array<Record<string, React.ReactNode>>;

/**
 * DataTableProps interface represents the props for the DataTable component.
 * @typeParam T - The type of data provided for the DataTable.
 */
export interface DataTableProps<T extends TableData = TableData>
  extends Omit<TableProps, "children"> {
  /** Headers mapping to define column names and their corresponding header content */
  headers?: Record<keyof T[number], React.ReactNode>;
  /** Data to be displayed in the table. Should be an array of objects with keys matching the headers' keys (non-mandatory) */
  data: T;
  /** Automatically create table headers based on the row keys */
  autoHeaders?: boolean;
}

/**
 * Data table is a component that transforms a JSON structure into a table
 * @param props - {@link DataTableProps}
 * @returns a React element
 */

export const DataTable = <T extends TableData>({
  headers,
  data,
  autoHeaders,
  ...otherProps
}: Readonly<DataTableProps<T>>): React.ReactElement => {
  const keys = useMemo(
    () =>
      [...data.flatMap((index) => Object.keys(index)), ...(headers ? Object.keys(headers) : [])]
        // Remove repeated
        .reduce<string[]>(
          (previous, current) => [...previous, ...(previous.includes(current) ? [] : [current])],
          [],
        ),
    [data, headers],
  );

  const computedHeaders = useMemo(
    () => ({
      ...(autoHeaders ? Object.fromEntries(keys.map((k) => [k, CC.capitalCase(k)])) : undefined),
      ...headers,
    }),
    [autoHeaders, keys, headers],
  );

  return (
    <Table {...otherProps}>
      {computedHeaders && (
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key}>{computedHeaders[key]}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {data.map((row) => (
          <tr key={JSON.stringify(row)}>
            {keys.map((key) => (
              <td key={key}>{row[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
