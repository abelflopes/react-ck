import React from "react";
import { CheckboxIconDefault } from "./CheckboxIconDefault";
import { BooleaInput, type BooleaInputProps } from "../boolean-input";

export type CheckboxProps = Omit<BooleaInputProps, "type">;

export const Checkbox = ({
  Icon = CheckboxIconDefault,
  ...otherProps
}: Readonly<CheckboxProps>): React.ReactElement => (
  <BooleaInput type="checkbox" Icon={Icon} {...otherProps} />
);
