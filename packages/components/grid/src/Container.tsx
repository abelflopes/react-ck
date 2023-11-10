import React, { useCallback, useMemo, useState } from "react";
import styles from "./styles/container.module.scss";
import classNames from "classnames";
import { GridContext, type GridContextProps } from "./context";

export interface GridContainerProps extends React.HTMLAttributes<HTMLHRElement> {
  /** The spacing between columns in the grid  */
  spacing?: "s" | "m" | "l" | "none";
  /** Whether to allow grid items to wrap to the next line  */
  wrap?: boolean;
}

export const GridContainer = ({
  spacing = "m",
  wrap = true,
  className,
  ...otherProps
}: Readonly<GridContainerProps>): React.ReactElement => {
  const [columnsCount, setColumnsCount] = useState(0);

  const registerColumn = useCallback<GridContextProps["registerColumn"]>(() => {
    setColumnsCount((v) => v + 1);

    return () => {
      setColumnsCount((v) => v - 1);
    };
  }, []);

  const contextValue = useMemo<GridContextProps>(
    () => ({
      columnsCount,
      registerColumn,
    }),
    [columnsCount, registerColumn],
  );

  return (
    <GridContext.Provider value={contextValue}>
      <div
        className={classNames(
          styles.root,
          styles["spacing_" + spacing],
          {
            [`${styles.wrap}`]: wrap,
          },
          className,
        )}
        {...otherProps}
      />
    </GridContext.Provider>
  );
};
