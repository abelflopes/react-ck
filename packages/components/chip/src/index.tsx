import classNames from "classnames";
import styles from "./styles/index.module.scss";
import React from "react";

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Specifies the visual style of the chip  */
  skin?: "negative" | "average" | "positive";
}

/**
 * Chip is a compact label that appears beside a primary interface area which is used to
 * represent status or metadata for that area.
 * @param props - {@link ChipProps}
 * @returns a React element
 */

export const Chip = ({
  skin,
  children,
  className,
  ...otherProps
}: Readonly<ChipProps>): React.ReactElement => (
  <div {...otherProps} className={classNames(styles.root, skin && styles[skin], className)}>
    {children}
  </div>
);
