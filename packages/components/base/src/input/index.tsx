import React, {
  type ComponentPropsWithRef,
  type HTMLInputTypeAttribute,
  useEffect,
  useMemo,
} from "react";
import defaultStyles from "./styles/default.module.scss";
import { useFormFieldContext, type FormFieldContextProps } from "../form-field";
import classNames from "classnames";

/**
 * Props interface for the Input component.
 * Extends native input props while providing additional styling capabilities.
 */
interface InputProps extends Omit<ComponentPropsWithRef<"input">, "children"> {
  /** Visual theme of the input field. If used within a FormField, this should be set on the FormField instead.
   * @default "default"
   */
  skin?: FormFieldContextProps["skin"];
  /** Whether the input should take the full width of the parent container. */
  fullWidth?: boolean;
  /** Whether to ignore context errors. */
  ignoreContextErrors?: boolean;
}

/**
 * A form input component that supports single-line text entry with customizable styling.
 * Can be used standalone or within a FormField component for additional functionality.
 *
 * @example
 * ```tsx
 * // Standalone usage
 * <Input type="text" placeholder="Enter text..." />
 *
 * // Within FormField
 * <FormField>
 *   <Input type="email" />
 * </FormField>
 * ```
 *
 * @param props - Component props {@link InputProps}
 * @returns React element
 */

export const Input = ({
  skin,
  fullWidth,
  id,
  className,
  disabled,
  ignoreContextErrors,
  ...props
}: Readonly<InputProps>): React.ReactElement => {
  const formFieldContext = useFormFieldContext();

  const computedSkin = useMemo(
    () => formFieldContext?.skin ?? skin ?? "default",
    [formFieldContext?.skin, skin],
  );

  const computedId = useMemo(() => formFieldContext?.id ?? id, [formFieldContext?.id, id]);

  // Determines if input should render the default styles or not
  const isDefaultStyle = useMemo(() => {
    const specialTypes: HTMLInputTypeAttribute[] = ["checkbox", "radio", "range", "color"];
    return !props.type || !specialTypes.includes(props.type);
  }, [props.type]);

  // Validate usage inside form field
  useEffect(() => {
    // Is not inside form field, skip
    if (formFieldContext === undefined || ignoreContextErrors) return;

    // Is inside form field
    if (skin) throw new Error("When using input inside form field, define skin on the form field");
    else if (id) throw new Error("When using input inside form field, define id on the form field");
  }, [formFieldContext, id, skin, ignoreContextErrors]);

  return (
    <input
      {...props}
      id={computedId}
      disabled={disabled || formFieldContext?.disabled}
      className={classNames(
        isDefaultStyle && [
          defaultStyles.root,
          formFieldContext === undefined && defaultStyles.standalone,
          defaultStyles[`skin_${computedSkin}`],
          (fullWidth ?? formFieldContext?.fullWidth) && defaultStyles.full_width,
        ],
        className,
      )}
    />
  );
};

export { type InputProps };
