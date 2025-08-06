import React from "react";

/** Props for configuring a table data cell */
export type TdProps = React.ComponentPropsWithRef<"td">;

/** Standard table data cell component */
export const Td = (props: Readonly<TdProps>): React.ReactElement => <td {...props} />;
