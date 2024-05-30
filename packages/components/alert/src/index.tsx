import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./styles/index.module.scss";
import { Text } from "@react-ck/text";
import { Button } from "@react-ck/button";
import { IconClose, Icon } from "@react-ck/icon";

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
  children,
  className,
  ...otherProps
}: Readonly<AlertProps>): React.ReactNode => {
  const [computedOpen, setComputedOpen] = useState(open);

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
          icon={<Icon Icon={IconClose} />}
          size="s"
          skin="ghost"
          onClick={() => {
            setComputedOpen(false);
          }}
        />
      ) : null}
    </div>
  ) : null;
};
