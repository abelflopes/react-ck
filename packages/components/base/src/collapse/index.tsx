import React, { useState } from "react";
import styles from "./styles/index.module.scss";
import { Icon } from "@react-ck/icon";
import { IconChevronDown } from "@react-ck/icon/icons/IconChevronDown";
import classNames from "classnames";

/** Available spacing options for vertical padding */
type CollapseSpacing = "none" | "xs" | "s" | "m" | "l";

/**
 * Props interface for the Collapse component.
 * Extends HTML details element props with collapsible functionality.
 */
export interface CollapseProps extends React.DetailsHTMLAttributes<HTMLDetailsElement> {
  /** Content displayed in the always-visible header section */
  header: NonNullable<React.ReactNode>;
  /** Called when the collapse state changes
   * @param open - Whether the section is expanded
   */
  onOpenChange?(open: boolean): void;
  /** Vertical padding between sections.
   * @default "s"
   */
  spacing?: CollapseSpacing;
  /** Whether to keep collapsed content in DOM.
   * @default false
   */
  keepInDom?: boolean;
}

/**
 * Expandable/collapsible section with header and content areas.
 * Based on the HTML details element with enhanced styling and behavior.
 *
 * @example
 * ```tsx
 * <Collapse
 *   header="Section Title"
 *   onOpenChange={(open) => console.log(open)}
 * >
 *   <Content />
 * </Collapse>
 * ```
 *
 * @param props - Component props {@link CollapseProps}
 * @returns React element
 */

export const Collapse = ({
  header,
  children,
  onToggle,
  onOpenChange,
  spacing = "s",
  className,
  keepInDom,
  ...otherProps
}: Readonly<CollapseProps>): React.ReactElement => {
  const [internalOpen, setInternalOpen] = useState(otherProps.open);

  return (
    <details
      {...otherProps}
      className={classNames(className, styles[`spacing_${spacing}`])}
      onToggle={(e) => {
        setInternalOpen(e.currentTarget.open);
        onOpenChange?.(e.currentTarget.open);
        onToggle?.(e);
      }}>
      <summary className={classNames(styles.header, internalOpen && styles.header_open)}>
        <Icon>
          <IconChevronDown className={classNames(styles.icon, internalOpen && styles.icon_open)} />
        </Icon>

        <div className={styles.header_content}>{header}</div>
      </summary>

      {keepInDom || internalOpen ? children : null}
    </details>
  );
};
