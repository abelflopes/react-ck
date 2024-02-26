// React
import React, { useEffect, useMemo, useState } from "react";
// Utils
import classNames from "classnames";
// Styles
import styles from "./styles/index.module.scss";

interface SkeletonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
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
  const N = useMemo(() => (n += 1 % 3), []);

  useEffect(() => {
    setIndex((n += 1));

    return () => {
      n -= 1;

      setIndex(undefined);
    };
  }, [variation]);

  return (
    <div
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
