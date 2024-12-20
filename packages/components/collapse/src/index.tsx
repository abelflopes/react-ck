import React, { useState } from "react";
import styles from "./styles/index.module.scss";
import { Icon } from "@react-ck/icon";
import { IconChevronDown } from "@react-ck/icon/icons/IconChevronDown";
import classNames from "classnames";

/** Represents the possible variations for the Collapse component  */
type CollapseSpacing = "none" | "xs" | "s" | "m" | "l";

export interface CollapseProps extends React.DetailsHTMLAttributes<HTMLDetailsElement> {
  /** The content to be displayed as the header of the collapse component  */
  header: NonNullable<React.ReactNode>;
  onOpenChange?(open: boolean): void;
  /** Adds vertical spacing to the Collapse  */
  spacing?: CollapseSpacing;
  keepInDom?: boolean;
}

/**
 * Collapse is a vertically stacked list of interactive items. Each item can be "collapsed"
 * with only a summary visible or “expanded” to show the full content for that item.
 * @param props - {@link CollapseProps}
 * @returns a React element
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
