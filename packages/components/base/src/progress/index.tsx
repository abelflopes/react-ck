// React
import React, { useMemo } from "react";
// Utils
import classNames from "classnames";
// Styles
import styles from "./styles/index.module.scss";

/**
 * Props for configuring the Progress component
 */
export interface ProgressProps
  extends Omit<React.ProgressHTMLAttributes<HTMLProgressElement>, "children"> {
  /** Minimum value - corresponds to 0% progress. Defaults to 0 */
  min?: number;
  /** Maximum value - corresponds to 100% progress. Defaults to 100 */
  max?: number;
  /** Current progress value between min and max */
  value: number;
}

/**
 * Visual indicator for task or operation progress
 * Automatically calculates percentage based on min/max range
 */
export const Progress = ({
  min = 0,
  max = 100,
  value,
  className,
  ...otherProps
}: Readonly<ProgressProps>): React.ReactElement => {
  const percent = useMemo(() => {
    const computedMin = Math.min(min, value, max);
    const computedMax = Math.max(min, value, max);

    const diff = Math.abs(computedMin - computedMax);
    const pos = value - computedMin;
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
