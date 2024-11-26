import React, { useMemo } from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { Text } from "@react-ck/text";
import { FormFieldContext, type FormFieldContextProps } from "./context";

export interface FormFieldProps
  extends Pick<React.HTMLAttributes<HTMLDivElement>, "children" | "className"> {
  /** Specifies the visual style of the form-field  */
  skin?: Exclude<FormFieldContextProps["skin"], "ghost">;
  /** Defines the structure of the form-field  */
  variation?: "default" | "inline" | "inline-reverse" | "inline-content" | "inline-content-reverse";
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
 * **WARNING**: This component is used as an internal utility - if you want to render an element such as an input, use its component directly
 * @param props - {@link FormFieldProps}
 * @returns a React element
 */

export const FormField = ({
  skin = "default",
  variation = "default",
  label,
  description,
  validationMessage,
  children,
  className,
  ...otherProps
}: Readonly<FormFieldProps>): React.ReactElement => {
  const id = React.useId();

  const context = useMemo<FormFieldContextProps>(
    () => ({
      skin,
      id,
    }),
    [id, skin],
  );

  return (
    <FormFieldContext.Provider value={context}>
      <div
        {...otherProps}
        className={classNames(
          styles.root,
          styles[`skin_${skin}`],
          styles[`variation_${variation}`],
          className,
        )}>
        <div className={styles.main_content}>
          {label ? (
            <Text
              className={styles.label}
              variation={variation === "default" ? "small" : "p"}
              margin="none"
              as={<label htmlFor={id}>{label}</label>}
            />
          ) : null}

          <div className={styles.input_wrapper}>{children}</div>
        </div>

        {description || validationMessage ? (
          <div>
            {description ? (
              <Text variation="small" margin="none" className={styles.description}>
                {description}
              </Text>
            ) : null}

            {validationMessage ? (
              <Text className={styles.validation_message} variation="small" margin="none">
                {validationMessage}
              </Text>
            ) : null}
          </div>
        ) : null}
      </div>
    </FormFieldContext.Provider>
  );
};
