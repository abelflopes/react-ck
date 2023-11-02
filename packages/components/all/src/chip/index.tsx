import classNames from "classnames";
import styles from "./index.module.scss";
import React from "react";

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  skin?: "default" | "negative" | "average" | "positive";
}

export const Chip = ({
  skin,
  children,
  className,
  ...otherProps
}: Readonly<ChipProps>): React.ReactElement => (
  <div {...otherProps} className={classNames(styles.root, styles[skin], className)}>
    {children}
  </div>
);
