import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { Overlay, type OverlayProps } from "../overlay";
import { Spinner } from "../spinner";
import { OverlaySpinnerContainer } from "./Container";

/**
 * Props for configuring the OverlaySpinner component
 */
interface OverlaySpinnerProps extends OverlayProps {
  /** Whether the spinner is visible. Defaults to true */
  active?: boolean;
}

/**
 * Loading indicator that covers its container with a light overlay
 * Provides Container subcomponent for relative positioning context
 */
const OverlaySpinner = ({
  active = true,
  className,
  ...otherProps
}: Readonly<OverlaySpinnerProps>): React.ReactElement => (
  <Overlay
    skin="light"
    {...otherProps}
    className={classNames(styles.overlay, className, {
      [`${styles.overlay__active}`]: active,
    })}>
    <Spinner />
  </Overlay>
);

OverlaySpinner.Container = OverlaySpinnerContainer;

export { type OverlaySpinnerProps, OverlaySpinner };
