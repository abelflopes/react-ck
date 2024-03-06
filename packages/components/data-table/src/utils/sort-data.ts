import React from "react";
import { type SortMode, type TableData } from "../types";
import { componentToText } from "@react-ck/react-utils";

export const sortData = <T extends TableData>(
  data: T,
  sortKey: keyof T[number],
  sortMode: SortMode,
): T => {
  const k = String(sortKey);

  return data.sort((a, b) => {
    /* eslint-disable @typescript-eslint/no-non-null-assertion -- values always exist */
    let valueA = a[k]!;
    let valueB = b[k]!;
    /* eslint-enable */

    if ([valueA, valueB].every((i) => !Number.isNaN(Number(i)))) {
      // if both are numbers
      valueA = Number(valueA);
      valueB = Number(valueB);
    } else if (
      [valueA, valueB].every((i) => typeof i === "string" && JSON.stringify(new Date(i)) !== "null")
    ) {
      // if both are dates
      valueA = new Date(String(valueA)).getTime();
      valueB = new Date(String(valueB)).getTime();
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
};
