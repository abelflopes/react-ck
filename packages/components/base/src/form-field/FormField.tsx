import React, { useMemo } from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { Text } from "../text";
import { FormFieldContext, type FormFieldContextProps } from "./context";

/**
 * Props interface for the FormField component.
 * Provides a structured container for form inputs with labels, descriptions, and validation messages.
 */
export interface FormFieldProps
  extends Pick<React.HTMLAttributes<HTMLDivElement>, "children" | "className" | "id"> {
  /** Visual theme of the form field. Affects the appearance and validation state display.
   * @default "default"
   */
  skin?: FormFieldContextProps["skin"];
  /** Layout structure of the form field. Controls the positioning of labels and inputs.
   * - default: Label above input
   * - inline: Label and input on same line
   * - inline-reverse: Input before label on same line
   * - inline-content: Custom content layout
   * - inline-content-reverse: Reversed custom content layout
   * @default "default"
   */
  variation?: "default" | "inline" | "inline-reverse" | "inline-content" | "inline-content-reverse";
  /** Label text or element displayed for the form field.
   * Associates with the input through generated or provided id.
   */
  label?: React.ReactNode;
  /** Helper text displayed below the input to provide additional context or instructions. */
  description?: React.ReactNode;
  /** Validation feedback message displayed below the description when input needs attention. */
  validationMessage?: React.ReactNode;
  /** Whether the form field is disabled. */
  disabled?: boolean;
}

/**
 * A compound component that provides a consistent layout and styling for form inputs.
 * Handles label association, descriptions, and validation messages while providing context to child components.
 *
 * @example
 * ```tsx
 * <FormField
 *   label="Email"
 *   description="Enter your work email"
 *   validationMessage={error && "Please enter a valid email"}
 * >
 *   <Input type="email" />
 * </FormField>
 * ```
 *
 * @param props - Component props {@link FormFieldProps}
 * @returns React element
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
  disabled,
  ...otherProps
}: Readonly<FormFieldProps>): React.ReactElement => {
  const generatedId = useMemo(() => `ff-${Math.random()}-${Number(new Date())}`, []);

  const computedId = useMemo(() => id ?? generatedId, [id, generatedId]);

  const context = useMemo<FormFieldContextProps>(
    () => ({
      skin,
      id: computedId,
      disabled,
    }),
    [computedId, skin, disabled],
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
        disabled && styles.disabled,
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
