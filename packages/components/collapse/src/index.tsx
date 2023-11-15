import React from "react";
import styles from "./styles/index.module.scss";

export interface CollapseProps extends React.DetailsHTMLAttributes<HTMLDetailsElement> {
  /** The content to be displayed as the header of the collapse component  */
  header: NonNullable<React.ReactNode>;
}

/**
 * Collapse is a vertically stacked list of interactive items. Each item can be "collapsed"
 * with only a summary visible or “expanded” to show the full content for that item.
 * @param props - {@link CollapseProps}
 * @returns a React element
 */

export const Collapse = ({
  header,
  children,
  className,
  ...otherProps
}: Readonly<CollapseProps>): React.ReactElement => (
  <details {...otherProps}>
    <summary className={styles.header}>{header}</summary>
    {children}
  </details>
);
