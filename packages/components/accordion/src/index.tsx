import React from "react";
import { List, type ListProps } from "@react-ck/list";
import { Collapse } from "@react-ck/collapse";
import styles from "./styles/index.module.scss";

export interface AccordionItem {
  header: NonNullable<React.ReactNode>;
  children: NonNullable<React.ReactNode>;
}

export interface AccordionProps extends Omit<ListProps, "items"> {
  items: AccordionItem[];
}

/**
 * An accordion is a vertically stacked list of interactive items. Each item can be "collapsed" with only a summary visible or “expanded” to show the full content for that item.
 * @param props - {@link AccordionProps}
 * @returns a React element
 */

export const Accordion = ({
  items,
  ...otherProps
}: Readonly<AccordionProps>): React.ReactElement => (
  <List
    {...otherProps}
    items={items.map(({ header, children }) => (
      <Collapse key={String(JSON.stringify(header))} header={header}>
        <div className={styles.content}>{children}</div>
      </Collapse>
    ))}
  />
);
