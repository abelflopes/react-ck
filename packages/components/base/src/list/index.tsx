import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

export interface ListProps extends Omit<React.HTMLAttributes<HTMLUListElement>, "children"> {
  /** Specifies the visual style of the list */
  skin?: "bordered";
  /** An array of React nodes representing the list items  */
  items: React.ReactNode[];
}

/**
 * List is a grouping of related items. List can be ordered with numbers or unordered with bullets.
 * @param props - {@link ListProps}
 * @returns a React element
 */

export const List = ({
  skin = "bordered",
  items,
  className,
  ...otherProps
}: Readonly<ListProps>): React.ReactElement => (
  <ul className={classNames(styles.root, styles[skin], className)} {...otherProps}>
    {items.map((item, key) => (
      <li key={`${item?.toString()}-${key.toString()}`} className={styles.item}>
        {item}
      </li>
    ))}
  </ul>
);
