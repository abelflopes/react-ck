// React
import React, { type ComponentProps, useEffect, useMemo, useState } from "react";
// Utils
import classNames from "classnames";
// Styles
import styles from "./styles/index.module.scss";

/**
 * Props for configuring the Skeleton component
 */
interface SkeletonProps extends Omit<ComponentProps<"span">, "children"> {
  /** Visual style of the loading placeholder. Defaults to "default" */
  variation?: "default" | "text";
}

let n = 1;

/**
 * Loading placeholder with animated shimmer effect
 * Supports text and default variations for different content types
 */
export const Skeleton = ({
  variation = "default",
  className,
  style,
  ...otherProps
}: Readonly<SkeletonProps>): React.ReactElement => {
  const [index, setIndex] = useState<number | undefined>(undefined);
  const N = useMemo(() => (n += 1) % 3, []);

  useEffect(() => {
    setIndex((n += 1));

    return () => {
      n -= 1;

      setIndex(undefined);
    };
  }, [variation]);

  return (
    <span
      className={classNames(styles.root, styles[variation], className)}
      style={{
        ...style,
        ...(index === undefined
          ? {}
          : {
              "--index": N,
            }),
      }}
      {...otherProps}
    />
  );
};
