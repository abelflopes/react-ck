import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

export interface ListProps extends Omit<React.HTMLAttributes<HTMLUListElement>, "children"> {
  skin?: "bordered";
  items: React.ReactNode[];
}

export const List = ({
  skin,
  items,
  className,
  ...otherProps
}: Readonly<ListProps>): React.ReactElement => (
  <ul className={classNames(styles.root, skin && styles[skin], className)} {...otherProps}>
    {items.map((item, key) => (
      <li key={`${item?.toString()}-${key.toString()}`} className={styles.item}>
        {item}
      </li>
    ))}
  </ul>
);
