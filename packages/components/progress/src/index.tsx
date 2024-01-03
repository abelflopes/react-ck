// React
import React, { useMemo } from "react";
// Utils
import classNames from "classnames";
// Styles
import styles from "./styles/index.module.scss";

// TODO: semantic - change tag to <progress />

interface ProgressProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Minimum value - corresponds to 0% progress */
  min?: number;
  /** Maximum value - corresponds to 100% progress */
  max?: number;
  /** Current value */
  value: number;
}

/**
 * Progress is a visual indicator that shows the users progress through a series of steps. It’s often used to keep the user focussed toward completing a task.
 * @param props - {@link ProgressProps}
 * @returns
 */

export const Progress = ({
  min = 0,
  max = 100,
  value,
  className,
  ...otherProps
}: Readonly<ProgressProps>): React.ReactElement => {
  const percent = useMemo(() => {
    const diff = Math.abs(min - max);
    const pos = value - min;
    return (pos * 100) / diff;
  }, [max, min, value]);

  return (
    <div className={classNames(styles.root, className)} {...otherProps}>
      <div
        className={styles.bar}
        style={{
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- necessary as react does not support CSS vars
          ["--value" as keyof React.CSSProperties]: `${percent}%`,
        }}
      />
    </div>
  );
};
