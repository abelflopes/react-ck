import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

export interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Specifies the visual style of the overlay  */
  skin?: "light" | "dark";
  /** If set to true, will blur background */
  blur?: boolean;
}

/**
 * Overlay is a floating layer used to redirect the focus of the user to
 * somewhere else other than the content it covers.
 * @param props - {@link OverlayProps}
 * @returns a React element
 */

export const Overlay = ({
  skin = "dark",
  blur = true,
  className,
  ...otherProps
}: Readonly<OverlayProps>): React.ReactElement => (
  <div
    className={classNames(styles.root, styles[skin], blur && styles.blur, className)}
    {...otherProps}
  />
);
