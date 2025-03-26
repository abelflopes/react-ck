import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

/**
 * Props for the EmptyState component
 */
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Sets how the component occupies the vertical space, "full" will make it full height */
  size?: "full" | "m" | "square";
  /** Sets color styles */
  skin?: "default" | "alt";
  /** Content to place spaced before children */
  before?: React.ReactNode;
  /** Content to place spaced after children */
  after?: React.ReactNode;
}

/**
 * The Empty State component serves as a crucial element in React applications,
 * providing a clean and user-friendly experience when no content is available.
 * @param props - {@link EmptyStateProps}
 * @returns a React element
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
