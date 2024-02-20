import React, { useCallback, useMemo, useState } from "react";
import { Table, type TableProps } from "@react-ck/table";
import * as CC from "change-case";
import { stringFromObject } from "./utils/string-from-object";
import { Icon } from "@react-ck/icon";
import styles from "./styles/index.module.scss";
import { componentToText } from "./utils/component-to-text";

// TODO: add pagination
// TODO: add section table

const sortModes = ["asc", "desc", "none"] as const;

/** Type representing the data structure for the DataTable component  */
type TableData = Array<Record<string, React.ReactNode>>;

export type SortCallback<T extends TableData> = (key: keyof T[number]) => void;

/**
 * DataTableProps interface represents the props for the DataTable component.
 * @typeParam T - The type of data provided for the DataTable.
 */
export interface DataTableProps<T extends TableData> extends Omit<TableProps, "children"> {
  /** Headers mapping to define column names and their corresponding header content */
  headers?: Partial<Record<keyof T[number], React.ReactNode>>;
  /** Data to be displayed in the table. Should be an array of objects with keys matching the headers' keys (non-mandatory) */
  data: T;
  /** Automatically create table headers based on the row keys */
  autoHeaders?: boolean;
  /** Allow user to sort tale content by clicking on table headers */
  sortable?: boolean | Array<keyof T[number]>;
  /** Sort callback to allow handling sorting externally instead of automatic string / number sorting */
  onSort?: SortCallback<T>;
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
  sortable,
  onSort,
  ...otherProps
}: Readonly<DataTableProps<T>>): React.ReactElement => {
  const [sortMode, setSortMode] = useState<(typeof sortModes)[number]>("none");
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
  const defaultOnSort = useCallback<SortCallback<T>>(
    (key) => {
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
    if (onSort || sortMode === "none" || !sortKey) return data;

    const k = String(sortKey);

    return [...data].sort((a, b) => {
      /* eslint-disable @typescript-eslint/no-non-null-assertion -- files always exist */
      let valueA = a[k]!;
      let valueB = b[k]!;
      /* eslint-enable */

      if ([valueA, valueB].every((i) => !Number.isNaN(Number(i)))) {
        // if both are numbers
        valueA = Number(valueA);
        valueB = Number(valueB);
      } else if ([valueA, valueB].every(React.isValidElement)) {
        // if both are react elements
        valueA = (componentToText(valueA) ?? "").trim().toLowerCase();
        valueB = (componentToText(valueB) ?? "").trim().toLowerCase();
      } else {
        // treat as regular strings
        valueA = String(valueA).trim().toLowerCase();
        valueB = String(valueB).trim().toLowerCase();
      }

      if (valueA > valueB) return sortMode === "desc" ? -1 : 1;
      else if (valueA < valueB) return sortMode === "desc" ? 1 : -1;
      return 0;
    });
  }, [data, onSort, sortKey, sortMode]);

  return (
    <Table {...otherProps}>
      {Object.keys(computedHeaders).length > 0 && (
        <thead>
          <tr>
            {keys.map((key) => (
              <th
                key={key}
                className={
                  sortable === true || (Array.isArray(sortable) && sortable.includes(key))
                    ? styles.sortable_header
                    : undefined
                }
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- FIXME: remove type assertion
                  defaultOnSort(key as keyof T[number]);
                }}>
                {computedHeaders[key]}

                {sortable === true ||
                  (Array.isArray(sortable) && sortable.includes(key) && (
                    <>
                      {sortKey === key && sortMode === "asc" && (
                        <Icon name="chevron-up" className={styles.sortable_header_icon} />
                      )}

                      {sortKey === key && sortMode === "desc" && (
                        <Icon name="chevron-down" className={styles.sortable_header_icon} />
                      )}
                    </>
                  ))}
              </th>
            ))}
          </tr>
        </thead>
      )}

      <tbody>
        {sortedData.map((row) => (
          <tr key={stringFromObject(row)}>
            {keys.map((key) => (
              <td key={key}>{row[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
