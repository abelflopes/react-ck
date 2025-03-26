import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import styles from "./styles/index.module.scss";
import { Text } from "../text";
import { Button } from "../button";
import { Icon } from "@react-ck/icon";
import { IconClose } from "@react-ck/icon/icons/IconClose";

type AlertDismissActionRenderer = (
  props: BaseAlertProps & Required<Pick<BaseAlertProps, "onDismiss">>,
) => React.ReactNode;

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

export interface BaseAlertProps {
  /** Main title of the alert */
  heading?: string;
  /** Specifies the visual style of the alert  */
  skin?: "neutral" | "primary" | "negative" | "average" | "positive" | "info";
  /** Structural variation of the alert */
  variation?: "default" | "compact";
  /** Alert size */
  size?: "s" | "m" | "l";
  /** Close handle, also renders a close icon when defined  */
  onDismiss?: () => void;
  /** Automatically dismiss after a given timeout */
  autoDismiss?: number;
}

export type { AlertDismissActionRenderer };

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, BaseAlertProps {
  /** Renderer for dismiss action */
  renderDismissAcion?: AlertDismissActionRenderer;
}

/**
 * Alert is a short message that provides contextual feedback in a prominent way.
 * @param props - {@link AlertProps}
 * @returns a React element
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
