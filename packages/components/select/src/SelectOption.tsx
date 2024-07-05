import { Menu } from "@react-ck/provisional";
import React, { useContext, useMemo } from "react";
import { SelectContext } from "./context";
import { componentToText, DISPLAY_NAME_ATTRIBUTE } from "@react-ck/react-utils";
import { type SelectOptionProps } from "./types";

const SelectOption = ({
  value,
  disabled,
  children,
  ...props
}: Readonly<SelectOptionProps>): React.ReactElement => {
  const context = useContext(SelectContext);

  const childrenText = useMemo(() => componentToText(children), [children]);

  const computedValue = useMemo(() => {
    const v = value ?? childrenText;

    if (!v || v.length === 0) throw new Error("Select option has no value");

    return v;
  }, [childrenText, value]);

  const displayChildren = useMemo(() => children ?? value, [children, value]);

  const isCurrentlySelected = context?.selectedValues.includes(computedValue);

  return (
    <Menu.Item
      {...props}
      disabled={disabled}
      skin={isCurrentlySelected ? "primary" : "default"}
      onClick={() => {
        if (disabled) return;

        context?.handleChange(computedValue, isCurrentlySelected ? "deselect" : "select");
      }}>
      {displayChildren}
    </Menu.Item>
  );
};

SelectOption[DISPLAY_NAME_ATTRIBUTE] = "SelectOption";

export { SelectOption };
