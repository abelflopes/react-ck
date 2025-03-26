import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

/**
 * Props for configuring the TopBar component
 */
export interface TopBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Content rendered in the left section */
  before?: React.ReactNode;
  /** Content rendered in the right section */
  after?: React.ReactNode;
}

/**
 * Fixed navigation bar for top-level actions
 * Supports three content sections: before, main (children), and after
 */
export const TopBar = ({
  before,
  after,
  className,
  children,
  ...otherProps
}: Readonly<TopBarProps>): React.ReactElement => (
  <nav className={classNames(styles.root, className)} {...otherProps}>
    {before ? <div className={styles.section}>{before}</div> : null}
    <div className={styles.section}>{children}</div>
    {after ? <div className={styles.section}>{after}</div> : null}
  </nav>
);
