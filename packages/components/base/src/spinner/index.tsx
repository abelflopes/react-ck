import classNames from "classnames";
import styles from "./styles/index.module.scss";
import React from "react";
import { Icon, type IconProps } from "@react-ck/icon";
import { IconSpinner } from "@react-ck/icon/icons/IconSpinner";

/**
 * Props for configuring the Spinner component
 */
export interface SpinnerProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Size of the spinner icon. Defaults to "xl" */
  size?: IconProps["size"];
  /** Visual theme of the spinner. Defaults to "primary" */
  skin?: "text" | "primary";
}

/**
 * Animated loading indicator for async operations
 * Supports different sizes and themes for various contexts
 */
export const Spinner = ({
  size = "xl",
  skin = "primary",
  className,
  ...otherProps
}: Readonly<SpinnerProps>): React.ReactElement => (
  <span {...otherProps} className={classNames(styles.root, styles[skin], className)}>
    <Icon size={size}>
      <IconSpinner />
    </Icon>
  </span>
);
