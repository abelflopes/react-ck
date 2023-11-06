import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

export interface OverlayProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  skin?: "light" | "dark";
}

export const Overlay = ({
  skin = "dark",
  className,
  ...otherProps
}: Readonly<OverlayProps>): React.ReactElement => (
  <div className={classNames(styles.root, styles[skin], className)} {...otherProps} />
);
