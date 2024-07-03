import React from "react";

export type AutocompleteOptionProps = React.OptionHTMLAttributes<HTMLOptionElement>;

export const AutocompleteOption = ({
  ...props
}: Readonly<AutocompleteOptionProps>): React.ReactElement => <option {...props} />;
