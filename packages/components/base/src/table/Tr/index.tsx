import React from "react";

/** Props for configuring a table row */
export type TrProps = React.HTMLAttributes<HTMLTableRowElement>;

/** Standard table row component */
export const Tr = (props: Readonly<TrProps>): React.ReactElement => <tr {...props} />;
