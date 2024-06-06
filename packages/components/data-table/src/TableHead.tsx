import React from "react";
import classNames from "classnames";
import { type SortMode } from "./types";
import { Icon } from "@react-ck/icon";
import { IconChevronUp } from "@react-ck/icon/icons/IconChevronUp";
import { IconChevronDown } from "@react-ck/icon/icons/IconChevronDown";
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

    {sorting === "asc" && <Icon Icon={IconChevronUp} className={styles.sortable_header_icon} />}

    {sorting === "desc" && <Icon Icon={IconChevronDown} className={styles.sortable_header_icon} />}
  </th>
);
