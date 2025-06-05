import React, { forwardRef } from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

/**
 * Props interface for the Overlay component.
 * Defines visual options for the overlay layer.
 */
interface OverlayProps extends React.ComponentPropsWithoutRef<"div"> {
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
const Overlay = forwardRef<HTMLDivElement, Readonly<OverlayProps>>(
  ({ skin = "dark", blur = true, className, ...otherProps }, ref): React.ReactElement => (
    <div
      ref={ref}
      className={classNames(styles.root, styles[skin], blur && styles.blur, className)}
      {...otherProps}
    />
  ),
);

Overlay.displayName = "Overlay";

export { Overlay, type OverlayProps };
