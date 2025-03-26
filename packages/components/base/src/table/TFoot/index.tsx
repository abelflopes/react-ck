import classNames from "classnames";
import React from "react";
import { useTableContext } from "../context";
import styles from "./index.module.scss";

export type TFootProps = React.HTMLAttributes<HTMLTableSectionElement>;

export const TFoot = ({ className, ...props }: Readonly<TFootProps>): React.ReactElement => {
  const { skin } = useTableContext();

  return (
    <tfoot
      {...props}
      className={classNames(className, {
        [`${styles[skin]}`]: skin !== "default",
      })}
    />
  );
};
