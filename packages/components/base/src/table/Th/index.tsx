import React from "react";
import classNames from "classnames";
import { type SortMode } from "../types";
import { Icon } from "@react-ck/icon";
import { IconChevronUp } from "@react-ck/icon/icons/IconChevronUp";
import { IconChevronDown } from "@react-ck/icon/icons/IconChevronDown";
import styles from "./index.module.scss";

/**
 * Props for configuring a table header cell
 */
export interface ThProps extends React.ComponentPropsWithRef<"th"> {
  /** Optional sort mode to display sort indicator. When null, header is sortable but not sorted */
  sorting?: SortMode | null;
}

/**
 * Table header cell component with optional sorting functionality
 * Displays sort direction indicators when sorting is enabled
 */
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

      {sorting ? (
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
      ) : null}
    </span>
  </th>
);
