import React from "react";

export interface SelectOptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}

export const SelectOption = ({ ...props }: Readonly<SelectOptionProps>): React.ReactElement => (
  <option {...props} />
);
