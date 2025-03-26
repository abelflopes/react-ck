import React, { useMemo } from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { Text } from "../text";
import { FormFieldContext, type FormFieldContextProps } from "./context";

export interface FormFieldProps
  extends Pick<React.HTMLAttributes<HTMLDivElement>, "children" | "className" | "id"> {
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
  id,
  ...otherProps
}: Readonly<FormFieldProps>): React.ReactElement => {
  const generatedId = useMemo(() => `ff-${Math.random()}-${Number(new Date())}`, []);

  const computedId = useMemo(() => id ?? generatedId, [id, generatedId]);

  const context = useMemo<FormFieldContextProps>(
    () => ({
      skin,
      id: computedId,
    }),
    [computedId, skin],
  );

  const mappedChildren = useMemo(
    () =>
      React.Children.map(children, (child, index) => {
        // eslint-disable-next-line react/jsx-no-constructed-context-values -- not needed
        const fallbackContext: FormFieldContextProps = {
          ...context,
          id: `${context.id}-${index}`,
        };

        return (
          <FormFieldContext.Provider
            value={React.isValidElement(child) && index === 0 ? context : fallbackContext}>
            {child}
          </FormFieldContext.Provider>
        );
      }),
    [children, context],
  );

  return (
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
            variation={variation === "inline" || variation === "inline-reverse" ? "p" : "small"}
            margin="none"
            as={<label htmlFor={computedId}>{label}</label>}
          />
        ) : null}

        <div className={styles.input_wrapper}>{mappedChildren}</div>
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
  );
};
