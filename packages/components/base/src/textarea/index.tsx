import React, { useEffect, useMemo } from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { useFormFieldContext, type FormFieldProps } from "../form-field";

/**
 * Props interface for the Textarea component.
 * Extends native textarea attributes with form field integration.
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Visual theme of the textarea. When used within FormField, define on FormField instead.
   * @default "default"
   */
  skin?: FormFieldProps["skin"];
}

/**
 * Multi-line text input component with form field integration.
 * Supports standalone use or within FormField context.
 *
 * @example
 * ```tsx
 * // Standalone
 * <Textarea placeholder="Enter text..." rows={4} />
 *
 * // Within FormField
 * <FormField label="Description">
 *   <Textarea />
 * </FormField>
 * ```
 *
 * @param props - Component props {@link TextareaProps}
 * @returns React element
 */

export const Textarea = ({
  skin,
  id,
  className,
  disabled,
  ...props
}: Readonly<TextareaProps>): React.ReactElement => {
  const formFieldContext = useFormFieldContext();

  const computedSkin = useMemo(
    () => formFieldContext?.skin ?? skin ?? "default",
    [formFieldContext?.skin, skin],
  );

  const computedId = useMemo(() => formFieldContext?.id ?? id, [formFieldContext?.id, id]);

  // Validate usage inside form field
  useEffect(() => {
    // Is not inside form field, skip
    if (formFieldContext === undefined) return;

    // Is inside form field
    if (skin)
      throw new Error("When using textarea inside form field, define skin on the form field");
    else if (id)
      throw new Error("When using textarea inside form field, define id on the form field");
  }, [formFieldContext, id, skin]);

  return (
    <textarea
      {...props}
      id={computedId}
      disabled={disabled || formFieldContext?.disabled}
      className={classNames(
        styles.root,
        formFieldContext === undefined && styles.standalone,
        className,
        styles[`skin_${computedSkin}`],
      )}
    />
  );
};
