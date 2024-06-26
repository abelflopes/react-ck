import classNames from "classnames";
import * as styles from "./styles/dock.module.scss";
import React, { useMemo } from "react";
import { DockContext, type DockContextProps } from "./context";
import { DockItem } from "./DockItem";
import { DockMainItem } from "./DockMainItem";
import { ScrollableContainer } from "../scrollable-container";

interface DockProps extends React.HTMLAttributes<HTMLElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  expanded?: boolean;
  skin?: "default" | "shadowed";
}

// TODO: add a11y https://react.dev/reference/react-dom/createPortal#rendering-a-dock-dialog-with-a-portal

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
