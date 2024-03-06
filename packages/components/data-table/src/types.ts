export const sortModes = ["asc", "desc", "none"] as const;

export type SortMode = (typeof sortModes)[number];

/** Type representing the data structure for the DataTable component  */
export type TableData = Array<Record<string, React.ReactNode>>;

export type SortCallback<T extends TableData> = (key: keyof T[number]) => void;
