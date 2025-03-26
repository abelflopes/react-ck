import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import styles from "./styles/index.module.scss";
import { Text } from "../text";
import { Button } from "../button";
import { Icon } from "@react-ck/icon";
import { IconClose } from "@react-ck/icon/icons/IconClose";

/** Function type for rendering custom dismiss action buttons */
type AlertDismissActionRenderer = (
  props: BaseAlertProps & Required<Pick<BaseAlertProps, "onDismiss">>,
) => React.ReactNode;

/** Default renderer for the dismiss action button */
const defaultDismissActionRenderer: AlertDismissActionRenderer = ({ size, onDismiss }) => (
  <Button
    size={size === "s" ? "xs" : "s"}
    skin="secondary"
    skinVariation="ghost"
    icon={
      <Icon>
        <IconClose />
      </Icon>
    }
    onClick={() => {
      onDismiss();
    }}
  />
);

/**
 * Base props interface for Alert components.
 * Defines core functionality and appearance options.
 */
export interface BaseAlertProps {
  /** Title text displayed at the top of the alert */
  heading?: string;
  /** Visual theme affecting colors and emphasis.
   * @default "neutral"
   */
  skin?: "neutral" | "primary" | "negative" | "average" | "positive" | "info";
  /** Layout structure of the alert.
   * @default "default"
   */
  variation?: "default" | "compact";
  /** Controls the alert's overall size.
   * @default "m"
   */
  size?: "s" | "m" | "l";
  /** Callback for dismissing the alert. When provided, shows a close button. */
  onDismiss?: () => void;
  /** Time in milliseconds after which the alert will auto-dismiss.
   * Only works when onDismiss is provided.
   */
  autoDismiss?: number;
}

export type { AlertDismissActionRenderer };

/**
 * Props interface for the Alert component.
 * Extends base props with HTML div attributes and custom dismiss action.
 */
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, BaseAlertProps {
  /** Custom renderer for the dismiss action button.
   * @default defaultDismissActionRenderer
   */
  renderDismissAcion?: AlertDismissActionRenderer;
}

/**
 * Feedback component for displaying important messages or notifications.
 * Supports multiple visual styles, auto-dismissal, and custom dismiss actions.
 *
 * @example
 * ```tsx
 * <Alert
 *   heading="Success"
 *   skin="positive"
 *   onDismiss={() => setVisible(false)}
 * >
 *   Operation completed successfully
 * </Alert>
 * ```
 *
 * @param props - Component props {@link AlertProps}
 * @returns React element
 */

export const Alert = ({
  heading,
  skin = "neutral",
  variation = "default",
  size = "m",
  onDismiss,
  autoDismiss,
  children,
  className,
  renderDismissAcion = defaultDismissActionRenderer,
  ...otherProps
}: Readonly<AlertProps>): React.ReactNode => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout | typeof clearTimeout>>(undefined);

  useEffect(() => {
    if (autoDismiss === undefined) return;

    function removeTimeout(): void {
      if (timeoutRef.current !== undefined) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }
    }

    removeTimeout();

    timeoutRef.current = setTimeout(() => {
      onDismiss?.();
    }, autoDismiss);

    return removeTimeout;
  }, [autoDismiss, onDismiss]);

  return (
    <div
      {...otherProps}
      className={classNames(
        styles.root,
        styles[skin],
        styles[`size_${size}`],
        variation !== "default" && styles[variation],
        className,
      )}>
      <div className={styles.content}>
        {heading ? (
          <Text variation="p" skin="bold" margin="none" className={styles.heading}>
            {heading}
          </Text>
        ) : null}

        {children}
      </div>

      {onDismiss
        ? renderDismissAcion({ heading, skin, variation, size, onDismiss, autoDismiss })
        : null}
    </div>
  );
};
