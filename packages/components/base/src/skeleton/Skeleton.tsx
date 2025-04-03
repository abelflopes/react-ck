// React
import React, { type ComponentProps, useMemo } from "react";
// Utils
import classNames from "classnames";
// Styles
import styles from "./styles/index.module.scss";

/**
 * Props for configuring the Skeleton component
 */
interface SkeletonProps extends ComponentProps<"span"> {
  /** Visual style of the loading placeholder. Defaults to "default" */
  variation?: "default" | "text" | "content";
}

/**
 * Loading placeholder with animated shimmer effect
 * Supports text and default variations for different content types
 */
export const Skeleton = ({
  variation = "default",
  className,
  style,
  children,
  ...otherProps
}: Readonly<SkeletonProps>): React.ReactElement => {
  const sizeMulti = useMemo(() => Math.round(Math.random() * 100) / 100, []);

  return (
    <span
      className={classNames(styles.root, styles[variation], className)}
      style={{
        ...style,
        ...{
          "--size-multi": sizeMulti,
        },
      }}
      {...otherProps}>
      {children}
    </span>
  );
};
