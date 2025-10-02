import React from "react";
import { DISPLAY_NAME_ATTRIBUTE } from "@react-ck/react-utils";
import type { SelectDividerProps } from "./types";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

/**
 * A divider component for the Select component.
 * Used to group options visually within a select dropdown.
 *
 * @param props - Component props {@link SelectDividerProps}
 * @returns React element
 */
function SelectDivider({
  className,
  children,
  ...props
}: Readonly<SelectDividerProps>): React.ReactElement {
  return (
    <div
      className={classNames(styles.divider, Boolean(children) && styles.divider_text, className)}
      {...props}>
      {children}
    </div>
  );
}

SelectDivider[DISPLAY_NAME_ATTRIBUTE] = "SelectDivider";

export { SelectDivider };
