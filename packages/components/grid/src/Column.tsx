import React, { useEffect, useState } from "react";
import styles from "./styles/column.module.scss";
import classNames from "classnames";
import { useGridContext } from "./hooks";

export interface GridColumnProps extends React.HTMLAttributes<HTMLHRElement> {
  /** Specifies the size of the column.
   *  - When omitted will adapt to content size
   *  - When set to `auto` fits to the available space */
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto";
}

export const GridColumn = ({
  size,
  className,
  style,
  ...otherProps
}: Readonly<GridColumnProps>): React.ReactElement => {
  const [index, setIndex] = useState<number | undefined>(undefined);
  const { columnsCount, registerColumn } = useGridContext();

  useEffect(() => {
    const { index, deregister } = registerColumn();

    setIndex(index);

    return deregister;
  }, [registerColumn]);

  return (
    <div
      style={{
        ...style,
        ...{ "--size": size, "--columns": columnsCount, "--index": index },
      }}
      className={classNames(
        styles.root,
        {
          [`${styles.size_defined}`]: typeof size === "number",
          [`${styles.size_auto}`]: size === "auto",
        },
        className,
      )}
      {...otherProps}
    />
  );
};
