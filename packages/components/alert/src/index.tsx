import React from "react";
import classNames from "classnames";
import styles from "./styles/index.module.scss";
import { Text } from "@react-ck/text";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string;
  /** Specifies the visual style of the alert  */
  skin?: "neutral" | "primary" | "negative" | "average" | "positive";
}

// TODO: add dismiss

/**
 * Alert is a short message that provides contextual feedback in a prominent way.
 * @param props - {@link AlertProps}
 * @returns a React element
 */

export const Alert = ({
  heading,
  skin = "neutral",
  children,
  className,
  ...otherProps
}: Readonly<AlertProps>): React.ReactElement => (
  <div {...otherProps} className={classNames(styles.root, styles[skin], className)}>
    {heading && (
      <Text type="h4" as="p" variation="bold" margin={false} className={styles.heading}>
        {heading}
      </Text>
    )}
    {children}
  </div>
);
