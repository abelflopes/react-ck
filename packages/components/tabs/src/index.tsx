import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./styles/index.module.scss";

export interface TabsItem {
  id: string;
  heading: NonNullable<React.ReactNode>;
  content: NonNullable<React.ReactNode>;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  items: TabsItem[];
  activeTab?: string;
  onActiveTabChange?: (id: string) => void;
  keepInDom?: boolean;
}

/**
 * Tabs is a way to navigate between multiple views of information. It’s used to fit more information in a smaller area.
 * @param props - {@link TabsProps}
 * @returns a React element
 */

export const Tabs = ({
  items,
  activeTab,
  onActiveTabChange,
  keepInDom,
  className,
  ...otherProps
}: Readonly<TabsProps>): React.ReactElement => {
  const [computedActive, setComputedActive] = useState(activeTab ?? items[0]?.id);

  useEffect(() => {
    if (!activeTab) return;

    setComputedActive(activeTab);
  }, [activeTab]);

  return (
    <div className={classNames(className, styles.root)} {...otherProps}>
      <div className={styles.track}>
        {items.map(({ id, heading }) => (
          <button
            key={id}
            className={classNames(styles.tab, {
              [`${styles.tab_active}`]: id === computedActive,
            })}
            onClick={() => {
              setComputedActive(id);
              onActiveTabChange?.(id);
            }}>
            {heading}
          </button>
        ))}
      </div>

      <div className={styles.content_wrapper}>
        {items
          .filter((i) => keepInDom || i.id === computedActive)
          .map((i) => (
            <div
              key={i.id}
              className={classNames(styles.content, {
                [`${styles.content_active}`]: i.id === computedActive,
              })}>
              {i.content}
            </div>
          ))}
      </div>
    </div>
  );
};
