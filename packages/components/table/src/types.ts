export const sortModes = ["asc", "desc", "none"] as const;

export type SortMode = (typeof sortModes)[number];
