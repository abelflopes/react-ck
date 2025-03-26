import React from "react";

/** Props for configuring a table data cell */
export type TdProps = React.TdHTMLAttributes<HTMLTableCellElement>;

/** Standard table data cell component */
export const Td = (props: Readonly<TdProps>): React.ReactElement => <td {...props} />;
