import React, { useEffect, useRef, useState } from "react";
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
  skin?: "neutral" | "primary" | "negative" | "average" | "positive";
  /** Determines if the alert can be dismissed by clicking on the close button  */
  dismissable?: boolean;
  /** Defines if the alert is open */
  open?: boolean;
  /** Close handler */
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
  dismissable,
  open = true,
  onDismiss,
  autoDismiss,
  children,
  className,
  ...otherProps
}: Readonly<AlertProps>): React.ReactNode => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout | typeof clearTimeout>>(undefined);
  const [computedOpen, setComputedOpen] = useState(open);

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
      setComputedOpen(false);
    }, autoDismiss);

    return removeTimeout;
  }, [autoDismiss]);

  useEffect(() => {
    setComputedOpen(open);
  }, [open]);

  useEffect(() => {
    if (computedOpen === open || !onDismiss) return;

    if (!computedOpen) onDismiss();
  }, [computedOpen, onDismiss, open]);

  return computedOpen ? (
    <div {...otherProps} className={classNames(styles.root, styles[skin], className)}>
      <div>
        {heading ? (
          <Text variation="h4" as="p" skin="bold" margin="none" className={styles.heading}>
            {heading}
          </Text>
        ) : null}

        {children}
      </div>

      {dismissable ? (
        <Button
          size="s"
          skin="ghost"
          icon={
            <Icon>
              <IconClose />
            </Icon>
          }
          onClick={() => {
            setComputedOpen(false);
          }}
        />
      ) : null}
    </div>
  ) : null;
};
