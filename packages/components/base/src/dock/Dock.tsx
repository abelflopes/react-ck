import classNames from "classnames";
import styles from "./styles/dock.module.scss";
import React, { useMemo } from "react";
import { DockContext, type DockContextProps } from "./context";
import { DockItem } from "./DockItem";
import { DockMainItem } from "./DockMainItem";
import { ScrollableContainer } from "../scrollable-container";

/**
 * Props for configuring the Dock component
 */
interface DockProps extends React.HTMLAttributes<HTMLElement> {
  /** Content rendered at the top of the dock */
  header?: React.ReactNode;
  /** Content rendered at the bottom of the dock */
  footer?: React.ReactNode;
  /** Whether the dock is expanded to show labels. Defaults to false */
  expanded?: boolean;
  /** Visual style of the dock. Defaults to "default" */
  skin?: "default" | "shadowed";
}

// TODO: add a11y https://react.dev/reference/react-dom/createPortal#rendering-a-dock-dialog-with-a-portal

/**
 * Navigation sidebar with collapsible state
 * Provides Item and MainItem subcomponents for navigation links
 */
const Dock = ({
  header,
  footer,
  expanded = false,
  children,
  className,
  skin = "default",
  ...otherProps
}: Readonly<DockProps>): React.ReactNode => {
  const contextValue = useMemo<DockContextProps>(
    () => ({
      expanded,
    }),
    [expanded],
  );

  return (
    <DockContext.Provider value={contextValue}>
      <nav className={classNames(styles.root, styles[`skin_${skin}`], className)} {...otherProps}>
        {header ? <div className={styles.header}>{header}</div> : null}
        <ScrollableContainer className={styles.content}>{children}</ScrollableContainer>
        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </nav>
    </DockContext.Provider>
  );
};

Dock.Item = DockItem;

Dock.MainItem = DockMainItem;

export { Dock };
