import React from "react";

export type TdProps = React.TdHTMLAttributes<HTMLTableCellElement>;

export const Td = (props: Readonly<TdProps>): React.ReactElement => <td {...props} />;
