import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { Overlay, type OverlayProps } from "@react-ck/overlay";
import { Spinner } from "@react-ck/spinner";
import { OverlaySpinnerContainer } from "./Container";

interface OverlaySpinnerProps extends OverlayProps {
  active?: boolean;
}

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
