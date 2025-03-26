import React from "react";
import { List, type ListProps } from "../list";
import { Collapse, type CollapseProps } from "../collapse";
import styles from "./styles/index.module.scss";

/** Structure for individual accordion sections */
export interface AccordionItem {
  /** Content displayed in the always-visible header section */
  header: NonNullable<React.ReactNode>;
  /** Content displayed in the collapsible section */
  children: NonNullable<React.ReactNode>;
}

/**
 * Props interface for the Accordion component.
 * Extends List props with accordion-specific options.
 */
export interface AccordionProps extends Omit<ListProps, "items"> {
  /** Array of sections to be displayed in the accordion */
  items: AccordionItem[];
  /** Whether to keep collapsed content in DOM.
   * Useful for preserving state or preventing re-mounting.
   */
  keepInDom?: CollapseProps["keepInDom"];
}

/**
 * Vertically stacked collapsible sections for organizing content.
 * Each section can be expanded or collapsed independently.
 *
 * @example
 * ```tsx
 * <Accordion
 *   items={[
 *     {
 *       header: "Section 1",
 *       children: <Content1 />
 *     },
 *     {
 *       header: "Section 2",
 *       children: <Content2 />
 *     }
 *   ]}
 * />
 * ```
 *
 * @param props - Component props {@link AccordionProps}
 * @returns React element
 */

export const Accordion = ({
  items,
  keepInDom,
  ...otherProps
}: Readonly<AccordionProps>): React.ReactElement => (
  <List
    {...otherProps}
    items={items.map(({ header, children }) => (
      <Collapse key={String(JSON.stringify(header))} header={header} keepInDom={keepInDom}>
        <div className={styles.content}>{children}</div>
      </Collapse>
    ))}
  />
);
