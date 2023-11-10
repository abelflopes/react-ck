import React, { useEffect } from "react";
import styles from "./styles/column.module.scss";
import classNames from "classnames";
import { useGridContext } from "./context";

export interface GridColumnProps extends React.HTMLAttributes<HTMLHRElement> {
  /** Specifies the size of the column */
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto";
}

export const GridColumn = ({
  size = "auto",
  className,
  style,
  ...otherProps
}: Readonly<GridColumnProps>): React.ReactElement => {
  const { columnsCount, registerColumn } = useGridContext();

  useEffect(() => {
    const deregisterColumn = registerColumn();

    return deregisterColumn;
  }, [registerColumn]);

  return (
    <div
      style={{
        ...style,
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        ...({ "--size": size, "--columns": columnsCount } as React.CSSProperties),
      }}
      className={classNames(
        styles.root,
        {
          [`${styles.size_auto}`]: size === "auto",
        },
        className,
      )}
      {...otherProps}
    />
  );
};
