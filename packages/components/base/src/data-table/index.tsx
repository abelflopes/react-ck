import React, { useCallback, useMemo, useState } from "react";
import { type SortMode, sortModes, Table, type TableProps } from "../table";
import * as CC from "change-case";
import { stringFromObject } from "./utils/string-from-object";
import { type SortCallback, type TableData } from "./types";
import { sortData } from "./utils/sort-data";

// TODO: add pagination
// TODO: add section table

/**
 * Props for configuring the DataTable component
 * @typeParam T - Type of data to be displayed in the table
 */
export interface DataTableProps<T extends TableData> extends Omit<TableProps, "children"> {
  /** Column headers mapping. Keys correspond to data fields, values are header content */
  headers?: Partial<Record<keyof T[number], React.ReactNode>>;
  /** Array of objects to display in the table */
  data: T;
  /** Whether to generate headers automatically from data keys. Defaults to false */
  autoHeaders?: boolean;
  /** Enable sorting on all or specific columns. True for all, array for specific columns */
  sortable?: boolean | Array<keyof T[number]>;
  /** Custom sort handler for external sorting implementation */
  onSort?: SortCallback<T>;
}

/**
 * Renders tabular data with automatic column generation and optional sorting
 * Supports custom headers, automatic header generation, and column-specific sorting
 */
export const DataTable = <T extends TableData>({
  headers,
  data,
  autoHeaders,
  sortable,
  onSort,
  ...otherProps
}: Readonly<DataTableProps<T>>): React.ReactElement => {
  const [sortMode, setSortMode] = useState<SortMode>("none");
  const [sortKey, setSortKey] = useState<keyof T[number] | undefined>(undefined);

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

  // Generate headers object merged into autoHeaders, if applicable
  const computedHeaders = useMemo(
    () => ({
      ...(autoHeaders ? Object.fromEntries(keys.map((k) => [k, CC.capitalCase(k)])) : undefined),
      ...headers,
    }),
    [autoHeaders, keys, headers],
  );

  // Handle sorting
  const defaultOnSort = useCallback(
    (key: keyof T[number]) => {
      if (!sortable || (Array.isArray(sortable) && !sortable.includes(key))) return;

      if (key === sortKey) {
        const nextSortMode = sortModes[(sortModes.indexOf(sortMode) + 1) % sortModes.length];
        if (!nextSortMode) throw new Error("Invalid sort mode");
        setSortMode(nextSortMode);
      } else {
        setSortMode("asc");
      }

      setSortKey(key);
    },
    [sortKey, sortMode, sortable],
  );

  // Sort data if applicable
  const sortedData = useMemo(() => {
    if (!sortKey || sortMode === "none") return data;

    let sortedData = sortData(data, sortKey, sortMode);

    if (onSort) sortedData = onSort(data, sortKey, sortMode);

    return sortedData;
  }, [data, onSort, sortKey, sortMode]);

  function getHeadSorting(key: string): SortMode | null {
    const matchesKey = sortable === true || (Array.isArray(sortable) && sortable.includes(key));

    if (matchesKey && key === sortKey) return sortMode;
    else if (matchesKey && key !== sortKey) return "none";

    return null;
  }

  return (
    <Table {...otherProps}>
      {Object.keys(computedHeaders).length > 0 && (
        <Table.Thead>
          <Table.Tr>
            {keys.map((key) => (
              <Table.Th
                key={key}
                sorting={getHeadSorting(key)}
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- FIXME: remove type assertion
                  defaultOnSort(key as keyof T[number]);
                }}>
                {computedHeaders[key]}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
      )}

      <Table.TBody>
        {sortedData.map((row) => (
          <Table.Tr key={stringFromObject(row)}>
            {keys.map((key) => (
              <Table.Td key={key}>{row[key]}</Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.TBody>
    </Table>
  );
};
