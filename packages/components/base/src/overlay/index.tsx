import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

/**
 * Props interface for the Overlay component.
 * Defines visual options for the overlay layer.
 */
export interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual style affecting opacity and color.
   * @default "dark"
   */
  skin?: "light" | "dark" | "transparent";
  /** Whether to apply background blur effect.
   * @default true
   */
  blur?: boolean;
}

/**
 * Semi-transparent layer component for creating focus areas.
 * Used to overlay content and create modal-like experiences.
 *
 * @example
 * ```tsx
 * <Overlay skin="dark" blur={true} />
 * ```
 *
 * @param props - Component props {@link OverlayProps}
 * @returns React element
 */

export const Overlay = ({
  skin = "dark",
  blur = true,
  className,
  ...otherProps
}: Readonly<OverlayProps>): React.ReactElement => (
  <div
    className={classNames(styles.root, styles[skin], blur && styles.blur, className)}
    {...otherProps}
  />
);
