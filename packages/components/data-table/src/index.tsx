import React, { useMemo } from "react";
import { Table, type TableProps } from "@rck/table";

type TableData = Array<Record<string, React.ReactNode>>;

export interface DataTableProps<T extends TableData = TableData>
  extends Omit<TableProps, "children"> {
  headers?: Record<keyof T[number] | string, React.ReactNode>;
  data: T;
}

export const DataTable = <T extends TableData>({
  headers,
  data,
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

  return (
    <Table {...otherProps}>
      {headers && (
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key}>{headers[key]}</th>
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
