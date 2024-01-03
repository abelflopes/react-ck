import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { Text } from "@react-ck/text";

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Specifies the visual style of the form-field  */
  skin?: "default" | "negative" | "average" | "positive";
  /** The main label for the form field */
  label?: React.ReactNode;
  /** The description text for the form field */
  description?: React.ReactNode;
  /** The validation message text */
  validationMessage?: React.ReactNode;
}

/**
 * FormField is a component that provides a consistent layout and input peripherals.
 *
 * > **WARNING**: This component is used as an internal utility - if you want to render an element such as an input, use its component directly
 * @param props - {@link FormFieldProps}
 * @returns a React element
 */

export const FormField = ({
  skin = "default",
  label,
  description,
  validationMessage,
  children,
  className,
  ...otherProps
}: Readonly<FormFieldProps>): React.ReactElement => (
  <div {...otherProps} className={classNames(styles.root, styles[skin], className)}>
    {label && (
      <Text
        className={styles.label}
        variation={["bold", "small"]}
        margin={false}
        as={<label htmlFor="aaa">{label}</label>}
      />
    )}
    <div className={styles.content}>{children}</div>
    {description && (
      <Text className={styles.description} variation="small" margin={false}>
        {description}
      </Text>
    )}
    {validationMessage && (
      <Text className={styles.validation_message} variation="small" margin={false}>
        {validationMessage}
      </Text>
    )}
  </div>
);
