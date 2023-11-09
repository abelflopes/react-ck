import classNames from "classnames";
import styles from "./styles/index.module.scss";
import React from "react";

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Specifies the visual style of the chip  */
  skin?: "negative" | "average" | "positive";
}

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
