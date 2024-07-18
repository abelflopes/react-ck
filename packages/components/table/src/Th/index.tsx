import React from "react";
import classNames from "classnames";
import { type SortMode } from "../types";
import { Icon } from "@react-ck/icon";
import { IconChevronUp } from "@react-ck/icon/icons/IconChevronUp";
import { IconChevronDown } from "@react-ck/icon/icons/IconChevronDown";
import styles from "./index.module.scss";

export interface ThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sorting?: SortMode | null;
}

export const Th = ({
  sorting,
  className,
  children,
  ...otherProps
}: Readonly<ThProps>): React.ReactElement => (
  <th
    {...otherProps}
    className={classNames(styles.root, className, {
      [`${styles.sortable_header}`]: sorting,
    })}>
    <span className={styles.content}>
      {children}

      <span className={styles.sort_icon}>
        {sorting === "asc" && (
          <Icon>
            <IconChevronUp />
          </Icon>
        )}

        {sorting === "desc" && (
          <Icon>
            <IconChevronDown />
          </Icon>
        )}
      </span>
    </span>
  </th>
);
