// React
import React, { type ComponentProps, useEffect, useMemo, useState } from "react";
// Utils
import classNames from "classnames";
// Styles
import styles from "./styles/index.module.scss";

// TODO: make random size / or allow choosing

interface SkeletonProps extends Omit<ComponentProps<"span">, "children"> {
  variation?: "default" | "text";
}

let n = 1;

/**
 * A component that renders a skeleton placeholder for loading content.
 * @param props - {@link SkeletonProps}
 * @returns
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
