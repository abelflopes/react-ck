import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

/**
 * Props interface for the List component.
 * Defines styling and content options for unordered lists.
 */
export interface ListProps extends Omit<React.HTMLAttributes<HTMLUListElement>, "children"> {
  /** Visual style of the list container.
   * @default "bordered"
   */
  skin?: "bordered";
  /** Array of elements to be rendered as list items */
  items: React.ReactNode[];
}

/**
 * Container component for rendering a collection of related items.
 * Provides consistent styling and spacing for list items.
 *
 * @example
 * ```tsx
 * <List
 *   items={[
 *     "Item 1",
 *     <CustomItem key="2" />,
 *     "Item 3"
 *   ]}
 * />
 * ```
 *
 * @param props - Component props {@link ListProps}
 * @returns React element
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
