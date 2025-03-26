import React from "react";
import { RadioIconDefault } from "./RadioIconDefault";
import { BooleaInput, type BooleaInputProps } from "../boolean-input";

/**
 * Props interface for the Radio component.
 * Extends BooleanInput props with radio-specific defaults.
 */
export type RadioProps = Omit<BooleaInputProps, "type" | "Icon"> &
  Partial<Pick<BooleaInputProps, "Icon">>;

/**
 * Radio button input component with customizable appearance.
 * Supports form field integration and custom icons.
 *
 * @example
 * ```tsx
 * <FormField>
 *   <Radio name="option" value="1" />
 * </FormField>
 * ```
 *
 * @param props - Component props {@link RadioProps}
 * @returns React element
 */
export const Radio = ({
  Icon = RadioIconDefault,
  ...otherProps
}: Readonly<RadioProps>): React.ReactElement => (
  <BooleaInput type="radio" Icon={Icon} {...otherProps} />
);
