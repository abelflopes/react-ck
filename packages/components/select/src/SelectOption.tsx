import React from "react";

export type SelectOptionProps = React.OptionHTMLAttributes<HTMLOptionElement>;

export const SelectOption = ({ ...props }: Readonly<SelectOptionProps>): React.ReactElement => (
  <option {...props} />
);
