import React from "react";

export type TBodyProps = React.ComponentPropsWithRef<"tbody">;

export const TBody = (props: Readonly<TBodyProps>): React.ReactElement => <tbody {...props} />;
