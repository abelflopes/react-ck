import React from "react";
import { RadioIconDefault } from "./RadioIconDefault";
import { BooleaInput, type BooleaInputProps } from "../boolean-input";

export type RadioProps = Omit<BooleaInputProps, "type" | "Icon"> &
  Partial<Pick<BooleaInputProps, "Icon">>;

export const Radio = ({
  Icon = RadioIconDefault,
  ...otherProps
}: Readonly<RadioProps>): React.ReactElement => (
  <BooleaInput type="radio" Icon={Icon} {...otherProps} />
);
