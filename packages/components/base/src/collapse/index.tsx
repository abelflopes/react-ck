import React, { useEffect, useState } from "react";
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
  /** Whether to show the caret icon.
   * @default true
   */
  showCaret?: boolean;
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
  open,
  header,
  children,
  onOpenChange,
  spacing = "s",
  className,
  keepInDom,
  showCaret = true,
  ...otherProps
}: Readonly<CollapseProps>): React.ReactElement => {
  const [internalOpen, setInternalOpen] = useState(open);

  useEffect(() => {
    if (open !== undefined) setInternalOpen(open);
  }, [open]);

  return (
    <details
      {...otherProps}
      open={internalOpen}
      className={classNames(className, styles[`spacing_${spacing}`])}>
      <summary
        className={classNames(styles.header, internalOpen && styles.header_open)}
        onClick={(e) => {
          e.preventDefault();
          if (open === undefined) setInternalOpen(!internalOpen);
          onOpenChange?.(!internalOpen);
        }}>
        {showCaret && (
          <Icon>
            <IconChevronDown
              className={classNames(styles.icon, internalOpen && styles.icon_open)}
            />
          </Icon>
        )}

        <div className={styles.header_content}>{header}</div>
      </summary>

      {keepInDom || internalOpen ? children : null}
    </details>
  );
};
