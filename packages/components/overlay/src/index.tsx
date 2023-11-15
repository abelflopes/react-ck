import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

export interface OverlayProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Specifies the visual style of the overlay  */
  skin?: "light" | "dark";
}

/**
 * Overlay is a floating layer used to redirect the focus of the user to
 * somewhere else other than the content it covers.
 * @param props - {@link OverlayProps}
 * @returns a React element
 */

export const Overlay = ({
  skin = "dark",
  className,
  ...otherProps
}: Readonly<OverlayProps>): React.ReactElement => (
  <div className={classNames(styles.root, styles[skin], className)} {...otherProps} />
);
