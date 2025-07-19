import React, { useCallback, useMemo, useRef, useState } from "react";
import styles from "./styles/container.module.scss";
import classNames from "classnames";
import { GridContext, type GridContextProps } from "./context";
import { GridColumn } from "./Column";
import { useResponsiveProps, type ResponsiveProps } from "../responsive";

/**
 * Base props interface for the Grid component.
 * Defines layout options for the grid container.
 */
interface BaseProps extends React.HTMLAttributes<HTMLHRElement> {
  /** Gap between grid columns.
   * @default "m"
   */
  spacing?: "s" | "m" | "l" | "none";
  /** Whether columns can wrap to new lines.
   * @default true
   */
  wrap?: boolean;
  /** Vertical alignment of columns.
   * @default "default"
   */
  align?: "default" | "centered" | "stretch" | "start" | "end";
}

/** Props interface combining base props with responsive behavior */
type GridProps = BaseProps & ResponsiveProps<BaseProps>;

/**
 * Layout component for creating responsive grid systems.
 * Supports column-based layouts with customizable spacing and alignment.
 *
 * @example
 * ```tsx
 * <Grid spacing="m" align="stretch">
 *   <Grid.Column size={6}>Half width</Grid.Column>
 *   <Grid.Column size={6}>Half width</Grid.Column>
 * </Grid>
 * ```
 *
 * @param props - Component props {@link GridProps}
 * @returns React element
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

export { Grid, type GridProps };

export { type GridColumnProps } from "./Column";
