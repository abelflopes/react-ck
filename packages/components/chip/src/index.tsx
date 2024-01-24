import classNames from "classnames";
import styles from "./styles/index.module.scss";
import React from "react";

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Specifies the visual style of the chip  */
  skin?: "neutral" | "primary" | "negative" | "average" | "positive";
}

/**
 * Chip is a compact label that appears beside a primary interface area which is used to
 * represent status or metadata for that area.
 * @param props - {@link ChipProps}
 * @returns a React element
 */

export const Chip = ({
  skin = "neutral",
  children,
  className,
  ...otherProps
}: Readonly<ChipProps>): React.ReactElement => (
  <span {...otherProps} className={classNames(styles.root, styles[skin], className)}>
    {children}
  </span>
);
