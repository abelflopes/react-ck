import React from "react";
import classNames from "classnames";
import { type SortMode } from "./types";
import { ChevronDown, ChevronUp, Icon } from "@react-ck/icon";
import styles from "./styles/index.module.scss";

export interface TableHeadProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  sorting: SortMode | null;
}

export const TableHead = ({
  sorting,
  className,
  children,
  ...otherProps
}: Readonly<TableHeadProps>): React.ReactElement => (
  <th
    {...otherProps}
    className={classNames({
      className,
      [`${styles.sortable_header}`]: sorting,
    })}>
    {children}

    {sorting === "asc" && <Icon Icon={ChevronUp} className={styles.sortable_header_icon} />}

    {sorting === "desc" && <Icon Icon={ChevronDown} className={styles.sortable_header_icon} />}
  </th>
);
