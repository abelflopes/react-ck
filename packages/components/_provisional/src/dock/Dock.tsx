import classNames from "classnames";
import styles from "./styles/dock.module.scss";
import React, { useMemo } from "react";
import { DockContext, type DockContextProps } from "./context";
import { DockItem } from "./DockItem";
import { DockMainItem } from "./DockMainItem";

interface DockProps extends React.HTMLAttributes<HTMLElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  expanded?: boolean;
}

// TODO: add a11y https://react.dev/reference/react-dom/createPortal#rendering-a-dock-dialog-with-a-portal

const Dock = ({
  header,
  footer,
  expanded = false,
  children,
  className,
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
      <nav className={classNames(styles.root, className)} {...otherProps}>
        {header ? <div className={styles.header}>{header}</div> : null}
        <div className={styles.content}>{children}</div>
        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </nav>
    </DockContext.Provider>
  );
};

Dock.Item = DockItem;

Dock.MainItem = DockMainItem;

export { Dock };
