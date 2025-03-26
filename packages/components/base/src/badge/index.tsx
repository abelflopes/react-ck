import classNames from "classnames";
import styles from "./styles/index.module.scss";
import React from "react";

/**
 * Props interface for the Badge component.
 * Defines visual styling options for the badge.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual theme affecting the badge's appearance.
   * @default "neutral"
   */
  skin?: "neutral" | "primary" | "negative" | "average" | "positive";
}

/**
 * Compact label component for displaying status or metadata.
 * Commonly used to show counts, states, or categories.
 *
 * @example
 * ```tsx
 * <Badge skin="primary">New</Badge>
 * <Badge skin="positive">23</Badge>
 * ```
 *
 * @param props - Component props {@link BadgeProps}
 * @returns React element
 */
export const Badge = ({
  skin = "neutral",
  className,
  ...otherProps
}: Readonly<BadgeProps>): React.ReactElement => (
  <span {...otherProps} className={classNames(styles.root, styles[skin], className)} />
);
