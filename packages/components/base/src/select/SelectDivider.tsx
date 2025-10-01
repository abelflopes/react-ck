import { Menu } from "../menu";
import React from "react";
import { DISPLAY_NAME_ATTRIBUTE } from "@react-ck/react-utils";
import { type SelectDividerProps } from "./types";

/**
 * A divider component for the Select component.
 * Used to group options visually within a select dropdown.
 *
 * @param props - Component props {@link SelectDividerProps}
 * @returns React element
 */
const SelectDivider = ({ ...props }: Readonly<SelectDividerProps>): React.ReactElement => {
  return <Menu.Divider {...props} />;
};

SelectDivider[DISPLAY_NAME_ATTRIBUTE] = "SelectDivider";

export { SelectDivider };
