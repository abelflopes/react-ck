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
  /** Offset from the container */
  offset?: number;
}

/**
 * Loading indicator that covers its container with a light overlay
 * Provides Container subcomponent for relative positioning context
 */
const OverlaySpinner = ({
  active = true,
  offset = 0,
  className,
  style,
  ...otherProps
}: Readonly<OverlaySpinnerProps>): React.ReactElement => (
  <Overlay
    skin="light"
    {...otherProps}
    style={{
      ...style,
      ...({
        "--offset": offset,
      } as React.CSSProperties),
    }}
    className={classNames(styles.overlay, className, {
      [`${styles.overlay__active}`]: active,
    })}>
    <Spinner />
  </Overlay>
);

OverlaySpinner.Container = OverlaySpinnerContainer;

export { type OverlaySpinnerProps, OverlaySpinner };
