import React from "react";

/**
 * Context props interface for the FormField component.
 * Provides styling and identification context to child form elements.
 */
export interface FormFieldContextProps {
  /** Visual theme of the form field that affects its appearance and validation state.
   * @default "default"
   */
  skin: "default" | "negative" | "average" | "positive" | "ghost" | "muted";
  /** Unique identifier for the form field, used for label-input association.
   * Generated automatically if not provided.
   */
  id: string;
  /** Whether the form field is disabled. */
  disabled: boolean | undefined;
  /** Whether the form field should take the full width of the parent container. */
  fullWidth: boolean | undefined;
}

/** Context for sharing form field state with child components */
export const FormFieldContext = React.createContext<FormFieldContextProps | undefined>(undefined);

/**
 * Hook to access the FormField context from child components.
 * Returns undefined if used outside of a FormField component.
 *
 * @example
 * ```tsx
 * const formField = useFormFieldContext();
 * if (formField) {
 *   // Use formField.skin or formField.id
 * }
 * ```
 */
export const useFormFieldContext = (): FormFieldContextProps | undefined =>
  React.useContext(FormFieldContext);
