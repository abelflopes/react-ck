import React from "react";
import styles from "./index.module.scss";
import classNames from "classnames";

export type THeadProps = React.ComponentPropsWithRef<"thead">;

export const THead = ({ className, ...props }: Readonly<THeadProps>): React.ReactElement => (
  <thead {...props} className={classNames(className, styles.root)} />
);
