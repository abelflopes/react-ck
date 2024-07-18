import { type SortMode } from "@react-ck/table";

/** Type representing the data structure for the DataTable component  */
export type TableData = Array<Record<string, React.ReactNode>>;

export type SortCallback<T extends TableData> = (
  data: T,
  sortKey: keyof T[number],
  sortMode: SortMode,
) => T;
