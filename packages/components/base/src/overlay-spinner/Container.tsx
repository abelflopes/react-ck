import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

export type OverlaySpinnerContainerProps = React.HTMLAttributes<HTMLDivElement>;

export const OverlaySpinnerContainer = ({
  className,
  ...otherProps
}: Readonly<React.HTMLAttributes<HTMLDivElement>>): React.ReactElement => (
  <div className={classNames(styles.container, className)} {...otherProps} />
);
