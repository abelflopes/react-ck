import React from "react";

export type TBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

export const TBody = (props: Readonly<TBodyProps>): React.ReactElement => <tbody {...props} />;
