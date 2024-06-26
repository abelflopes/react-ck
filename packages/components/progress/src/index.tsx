// React
import React, { useMemo } from "react";
// Utils
import classNames from "classnames";
// Styles
import * as styles from "./styles/index.module.scss";

interface ProgressProps
  extends Omit<React.ProgressHTMLAttributes<HTMLProgressElement>, "children"> {
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
    <progress
      className={classNames(styles.root, className)}
      value={percent}
      max={100}
      {...otherProps}
    />
  );
};
