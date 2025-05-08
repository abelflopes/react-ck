import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./styles/index.module.scss";

/**
 * Configuration for a single tab item
 */
export interface TabsItem {
  /** Unique identifier for the tab */
  id: string;
  /** Content displayed in the tab button */
  heading: NonNullable<React.ReactNode>;
  /** Optional content displayed when tab is active */
  content?: NonNullable<React.ReactNode>;
}

/**
 * Props for configuring the Tabs component
 */
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Skin of the tabs. Defaults to "default" */
  skin?: "default" | "chip";
  /** Spacing between tabs. Defaults to "m" */
  spacing?: "none" | "s" | "m" | "l" | "xl";
  /** Array of tab items to display */
  items: TabsItem[];
  /** ID of the currently active tab */
  activeTab?: string;
  /** Callback when active tab changes */
  onActiveTabChange?: (id: string) => void;
  /** Whether to keep inactive tab content in DOM. Defaults to false */
  keepInDom?: boolean;
}

/**
 * Navigation component for switching between related content sections
 * Manages tab selection and content visibility
 */
export const Tabs = ({
  skin = "default",
  spacing = "m",
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
    <div
      className={classNames(
        className,
        styles.root,
        styles[`skin_${skin}`],
        styles[`spacing_${spacing}`],
      )}
      {...otherProps}>
      <div className={styles.track}>
        {items.map(({ id, heading }) => (
          <button
            key={id}
            type="button"
            className={classNames(styles.tab_button, {
              [`${styles.tab_button_active}`]: id === computedActive,
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
          .filter((i) => i.content)
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
