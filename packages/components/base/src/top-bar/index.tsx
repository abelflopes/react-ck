import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

export interface TopBarProps extends React.HTMLAttributes<HTMLElement> {
  before?: React.ReactNode;
  after?: React.ReactNode;
}

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
