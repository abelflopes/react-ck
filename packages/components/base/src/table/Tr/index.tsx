import React from "react";
import classNames from "classnames";
import styles from "./index.module.scss";

/** Props for configuring a table row */
export type TrProps = React.HTMLAttributes<HTMLTableRowElement> & {
  /** Whether the row is selected */
  selected?: boolean;
  /** Whether the row is interactive */
  interactive?: boolean;
};

/** Standard table row component */
export const Tr = ({
  selected = false,
  interactive = false,
  className,
  ...props
}: Readonly<TrProps>): React.ReactElement => (
  <tr
    className={classNames(
      selected && styles.selected,
      interactive && styles.interactive,
      className,
    )}
    {...props}
  />
);
