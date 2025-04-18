import React from "react";
import { CheckboxIconDefault } from "./CheckboxIconDefault";
import { ToggleIcon } from "./ToggleIcon";
import { BooleaInput, type BooleaInputProps } from "../boolean-input";

/**
 * Props for the Checkbox component
 * Extends BooleaInput props, making Icon optional with a default checkbox icon
 */
export type CheckboxProps = Omit<BooleaInputProps, "type" | "Icon"> &
  Partial<Pick<BooleaInputProps, "Icon">> & {
    /**
     * Whether to render the checkbox as a toggle switch
     * @default false
     */
    isToggle?: boolean;
  };

/**
 * Checkbox input component with customizable icon and toggle variation
 * Inherits all standard input props and FormField context integration
 */
export const Checkbox = ({
  Icon,
  isToggle = false,
  ...otherProps
}: Readonly<CheckboxProps>): React.ReactElement => (
  <BooleaInput
    type="checkbox"
    Icon={Icon ?? (isToggle ? ToggleIcon : CheckboxIconDefault)}
    {...otherProps}
  />
);
