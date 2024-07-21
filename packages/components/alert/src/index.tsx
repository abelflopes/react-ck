import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import styles from "./styles/index.module.scss";
import { Text } from "@react-ck/text";
import { Button } from "@react-ck/button";
import { Icon } from "@react-ck/icon";
import { IconClose } from "@react-ck/icon/icons/IconClose";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Main title of the alert */
  heading?: string;
  /** Specifies the visual style of the alert  */
  skin?: "neutral" | "primary" | "negative" | "average" | "positive" | "info";
  /** Structural variation of the alert */
  variation?: "default" | "compact";
  /** Close handle, also renders a close icon when defined  */
  onDismiss?: () => void;
  /** Automatically dismiss after a given timeout */
  autoDismiss?: number;
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
  onDismiss,
  autoDismiss,
  children,
  className,
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
        variation !== "default" && styles[variation],
        className,
      )}>
      <div className={styles.content}>
        {heading ? (
          <Text variation="h4" as="p" skin="bold" margin="none" className={styles.heading}>
            {heading}
          </Text>
        ) : null}

        {children}
      </div>

      {onDismiss ? (
        <Button
          size={variation === "compact" ? "xs" : "s"}
          skin="ghost"
          icon={
            <Icon>
              <IconClose />
            </Icon>
          }
          onClick={() => {
            onDismiss();
          }}
        />
      ) : null}
    </div>
  );
};
