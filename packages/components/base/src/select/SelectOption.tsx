import { Menu } from "../menu";
import React, { useContext, useMemo } from "react";
import { SelectContext } from "./context";
import { DISPLAY_NAME_ATTRIBUTE } from "@react-ck/react-utils";
import { type SelectOptionProps } from "./types";

const SelectOption = ({
  value,
  disabled,
  children,
  ...props
}: Readonly<SelectOptionProps>): React.ReactElement => {
  const context = useContext(SelectContext);

  const displayChildren = useMemo(() => children ?? value, [children, value]);

  const computedValue = useMemo(() => {
    if (value) return value;

    if (typeof displayChildren === "string" || typeof displayChildren === "number")
      return displayChildren.toString();

    throw new Error("Impossible to compute the value, please pass the value prop to option");
  }, [value, displayChildren]);

  const isCurrentlySelected = useMemo(
    () => context?.selectedValues.includes(computedValue),
    [computedValue, context?.selectedValues],
  );

  return (
    <Menu.Item
      {...props}
      disabled={disabled}
      skin={isCurrentlySelected ? "primary" : "default"}
      onClick={() => {
        if (disabled) return;

        context?.handleChange(computedValue, isCurrentlySelected ? "deselect" : "select");

        props.onClick?.(e);
      }}>
      {displayChildren}
    </Menu.Item>
  );
};

SelectOption[DISPLAY_NAME_ATTRIBUTE] = "SelectOption";

export { SelectOption };
