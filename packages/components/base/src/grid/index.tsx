import React, { useCallback, useMemo, useRef, useState } from "react";
import styles from "./styles/container.module.scss";
import classNames from "classnames";
import { GridContext, type GridContextProps } from "./context";
import { GridColumn, type GridColumnProps } from "./Column";
import { useResponsiveProps, type ResponsiveProps } from "../responsive";

interface BaseProps extends React.HTMLAttributes<HTMLHRElement> {
  /** The spacing between columns in the grid  */
  spacing?: "s" | "m" | "l" | "none";
  /** Whether to allow grid items to wrap to the next line  */
  wrap?: boolean;
  /** Defined the alignment between columns */
  align?: "default" | "centered" | "stretch" | "start" | "end";
}

type GridProps = BaseProps & ResponsiveProps<BaseProps>;

/**
 * A container used to build layouts that align to a user-defined system of columns and rows.
 * @param props - {@link DividerProps}
 * @returns a React element
 */

const Grid = ({ responsive, ...baseProps }: Readonly<GridProps>): React.ReactElement => {
  const { spacing, wrap, align, className, ...otherProps } = useResponsiveProps<BaseProps>({
    baseProps: {
      ...baseProps,
      spacing: baseProps.spacing ?? "m",
      wrap: baseProps.wrap ?? true,
      align: baseProps.align ?? "default",
    },
    responsive,
  });

  const index = useRef(0);
  const [columnsCount, setColumnsCount] = useState(0);

  const registerColumn = useCallback<GridContextProps["registerColumn"]>(() => {
    setColumnsCount((v) => v + 1);

    return {
      index: (index.current += 1),
      deregister: (): void => {
        index.current -= 1;
        setColumnsCount((v) => v - 1);
      },
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
          styles[`spacing_${spacing}`],
          styles[`align_${align}`],
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

Grid.Column = GridColumn;

export { Grid, type GridProps, type GridColumnProps };
