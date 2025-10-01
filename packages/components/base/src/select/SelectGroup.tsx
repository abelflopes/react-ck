import React from "react";
import { DISPLAY_NAME_ATTRIBUTE } from "@react-ck/react-utils";
import { type SelectGroupProps } from "./types";
import { Text } from "../text";
import styles from "./styles/index.module.scss";

/**
 * A group component for organizing Select options with a label.
 * Provides visual separation and organization for related options.
 *
 * @example
 * ```tsx
 * <Select>
 *   <Select.Group name="Fruits">
 *     <Select.Option value="apple">Apple</Select.Option>
 *     <Select.Option value="banana">Banana</Select.Option>
 *   </Select.Group>
 *   <Select.Group name="Vegetables">
 *     <Select.Option value="carrot">Carrot</Select.Option>
 *     <Select.Option value="broccoli">Broccoli</Select.Option>
 *   </Select.Group>
 * </Select>
 * ```
 *
 * @param props - Component props {@link SelectGroupProps}
 * @returns React element
 */
const SelectGroup = ({
  name,
  children,
}: Readonly<Omit<SelectGroupProps, "disabled">>): React.ReactElement => {
  return (
    <div role="group" aria-labelledby={name} className={styles.group}>
      <div id={name} className={styles.group_name}>
        <Text margin="none" variation="small" skin={["bold", "soft"]}>
          {name}
        </Text>
      </div>
      {children}
    </div>
  );
};

SelectGroup[DISPLAY_NAME_ATTRIBUTE] = "SelectGroup";

export { SelectGroup };
