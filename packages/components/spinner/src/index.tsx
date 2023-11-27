import classNames from "classnames";
import styles from "./styles/index.module.scss";
import React from "react";
import { Icon, type IconProps } from "@react-ck/icon";

export interface SpinnerProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  size?: IconProps["size"];
  skin?: "default" | "primary";
}

/**
 * Spinner is a visual indicator that shows the status of an ongoing process happening in the background.
 * It’s often used to communicate that the user has to wait before the interface is ready for interaction.
 * @param props - {@link SpinnerProps}
 * @returns a React element
 */

export const Spinner = ({
  size = "l",
  skin = "default",
  className,
  ...otherProps
}: Readonly<SpinnerProps>): React.ReactElement => (
  <span {...otherProps} className={classNames(styles.root, styles[skin], className)}>
    <Icon name="spinner" size={size} />
  </span>
);
