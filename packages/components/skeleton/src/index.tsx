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
  const N = useMemo(() => n++ % 3, []);

  useEffect(() => {
    if (variation === "default") return;

    setIndex(n++);

    return () => {
      n--;
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
              // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- necessary as react does not support CSS vars
              ["--index" as keyof React.CSSProperties]: N,
            }),
      }}
      {...otherProps}
    />
  );
};
