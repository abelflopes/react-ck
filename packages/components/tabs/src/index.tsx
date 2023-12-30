import React, { useState } from "react";
import classNames from "classnames";
import styles from "./styles/index.module.scss";

export interface TabsItem {
  heading: NonNullable<React.ReactNode>;
  content: NonNullable<React.ReactNode>;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  items: TabsItem[];
}

/**
 * Tabs is a way to navigate between multiple views of information. It’s used to fit more information in a smaller area.
 * @param props - {@link TabsProps}
 * @returns a React element
 */

export const Tabs = ({
  items,
  className,
  ...otherProps
}: Readonly<TabsProps>): React.ReactElement => {
  const [current, setCurrent] = useState(0);

  return (
    <div className={classNames(className, styles.root)} {...otherProps}>
      <div className={styles.track}>
        {items.map(({ heading }, key) => (
          <button
            key={JSON.stringify(heading)}
            className={classNames(styles.tab, {
              [`${styles.tab_active}`]: key === current,
            })}
            onClick={() => {
              setCurrent(key);
            }}>
            {heading}
          </button>
        ))}
      </div>

      {items[current]?.content}
    </div>
  );
};
