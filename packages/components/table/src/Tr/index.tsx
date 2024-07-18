import React from "react";

export type TrProps = React.HTMLAttributes<HTMLTableRowElement>;

export const Tr = (props: Readonly<TrProps>): React.ReactElement => <tr {...props} />;
