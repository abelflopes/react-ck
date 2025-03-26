import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

/**
 * Props for configuring the EmptyState component
 */
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Vertical space configuration. Defaults to "full" */
  size?: "full" | "m" | "square";
  /** Visual theme. Defaults to "default" */
  skin?: "default" | "alt";
  /** Content rendered above the main content */
  before?: React.ReactNode;
  /** Content rendered below the main content */
  after?: React.ReactNode;
}

/**
 * Placeholder for empty or zero-state content areas
 * Supports flexible layouts with optional content above and below
 */
export const EmptyState = ({
  size = "full",
  skin = "default",
  before,
  after,
  className,
  children,
  ...otherProps
}: Readonly<EmptyStateProps>): React.ReactElement => (
  <div
    className={classNames(styles.root, styles[`size_${size}`], styles[`skin_${skin}`], className)}
    {...otherProps}>
    {before ? <div>{before} </div> : null}
    <div>{children}</div>
    {after ? <div>{after} </div> : null}
  </div>
);
