import React from "react";
import { CheckboxIconDefault } from "./CheckboxIconDefault";
import { BooleaInput, type BooleaInputProps } from "../boolean-input";

/**
 * Props for the Checkbox component
 * Extends BooleaInput props, making Icon optional with a default checkbox icon
 */
export type CheckboxProps = Omit<BooleaInputProps, "type" | "Icon"> &
  Partial<Pick<BooleaInputProps, "Icon">>;

/**
 * Checkbox input component with customizable icon
 * Inherits all standard input props and FormField context integration
 */
export const Checkbox = ({
  Icon = CheckboxIconDefault,
  ...otherProps
}: Readonly<CheckboxProps>): React.ReactElement => (
  <BooleaInput type="checkbox" Icon={Icon} {...otherProps} />
);
