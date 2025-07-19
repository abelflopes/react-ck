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
   * Displayed above the input.
   */
  label?: React.ReactNode;
  /** Label text or element displayed for the form field.
   * Associates with the input through generated or provided id.
   * Displayed alongside the input.
   */
  inlineLabel?: React.ReactNode;
  /** Helper text displayed below the input to provide additional context or instructions. */
  description?: React.ReactNode;
  /** Validation feedback message displayed below the description when input needs attention. */
  validationMessage?: React.ReactNode;
  /** Whether the form field is disabled. */
  disabled?: boolean;
  /** Whether the form field should take the full width of the parent container. */
  fullWidth?: boolean;
  /** Whether the form field should reserve space for the label. */
  reserveSpace?: boolean | ["label" | "description" | "validationMessage"];
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
  inlineLabel,
  description,
  validationMessage,
  children,
  className,
  id,
  disabled,
  fullWidth,
  reserveSpace,
  ...otherProps
}: Readonly<FormFieldProps>): React.ReactElement => {
  const generatedId = useMemo(() => `ff-${Math.random()}-${Date.now()}`, []);

  const computedId = useMemo(() => id ?? generatedId, [id, generatedId]);

  const context = useMemo<FormFieldContextProps>(
    () => ({
      skin,
      id: computedId,
      disabled,
      fullWidth,
    }),
    [computedId, skin, disabled, fullWidth],
  );

  const mappedChildren = useMemo(
    () =>
      React.Children.map(children, (child, index) => {
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

  const reserveSpaceLabel = useMemo(() => {
    if (reserveSpace === true) return true;
    if (Array.isArray(reserveSpace) && reserveSpace.includes("label")) return true;
    return false;
  }, [reserveSpace]);

  const reserveSpaceDescription = useMemo(() => {
    if (reserveSpace === true) return true;
    if (Array.isArray(reserveSpace) && reserveSpace.includes("description")) return true;
    return false;
  }, [reserveSpace]);

  const reserveSpaceValidationMessage = useMemo(() => {
    if (reserveSpace === true) return true;
    if (Array.isArray(reserveSpace) && reserveSpace.includes("validationMessage")) return true;
    return false;
  }, [reserveSpace]);

  return (
    <div
      {...otherProps}
      className={classNames(
        styles.root,
        styles[`skin_${skin}`],
        styles[`variation_${variation}`],
        disabled && styles.disabled,
        fullWidth && styles.full_width,
        className,
      )}>
      {label || reserveSpaceLabel ? (
        <Text
          className={styles.label}
          variation="small"
          margin="none"
          as={label ? <label htmlFor={computedId}>{label}</label> : undefined}>
          {!label && reserveSpaceLabel ? (
            <span className={classNames(styles.reserve_space)}> </span>
          ) : null}
        </Text>
      ) : null}

      <div className={styles.main_content}>
        {inlineLabel ? (
          <Text
            className={styles.label}
            variation="p"
            margin="none"
            as={inlineLabel ? <label htmlFor={computedId}>{inlineLabel}</label> : undefined}
          />
        ) : null}

        <div className={styles.input_wrapper}>{mappedChildren}</div>
      </div>

      {description ||
      validationMessage ||
      reserveSpaceDescription ||
      reserveSpaceValidationMessage ? (
        <div>
          {description || reserveSpaceDescription ? (
            <Text variation="small" margin="none" className={styles.description}>
              {description}
              {!description && reserveSpaceDescription ? (
                <span className={classNames(styles.reserve_space)}> </span>
              ) : null}
            </Text>
          ) : null}

          {validationMessage || reserveSpaceValidationMessage ? (
            <Text className={styles.validation_message} variation="small" margin="none">
              {validationMessage}

              {!validationMessage && reserveSpaceValidationMessage ? (
                <span className={classNames(styles.reserve_space)}> </span>
              ) : null}
            </Text>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
