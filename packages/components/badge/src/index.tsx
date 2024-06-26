import classNames from "classnames";
import * as styles from "./styles/index.module.scss";
import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Specifies the visual style of the badge  */
  skin?: "neutral" | "primary" | "negative" | "average" | "positive";
}

/**
 * Badge is a compact label that appears beside a primary interface area which is used to represent status or metadata for that area..
 * @param props - {@link BadgeProps}
 * @returns a React element
 */

export const Badge = ({
  skin = "neutral",
  className,
  ...otherProps
}: Readonly<BadgeProps>): React.ReactElement => (
  <span {...otherProps} className={classNames(styles.root, styles[skin], className)} />
);
