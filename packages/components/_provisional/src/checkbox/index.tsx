import React from "react";
import { CheckboxIconDefault } from "./CheckboxIconDefault";
import { BooleaInput, type BooleaInputProps } from "../boolean-input";

export type CheckboxProps = Omit<BooleaInputProps, "type" | "Icon"> &
  Partial<Pick<BooleaInputProps, "Icon">>;

export const Checkbox = ({
  Icon = CheckboxIconDefault,
  ...otherProps
}: Readonly<CheckboxProps>): React.ReactElement => (
  <BooleaInput type="checkbox" Icon={Icon} {...otherProps} />
);
