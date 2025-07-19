import React, { useEffect, useState } from "react";
import styles from "./styles/column.module.scss";
import classNames from "classnames";
import { useGridContext } from "./hooks";
import { useResponsiveProps, type ResponsiveProps } from "../responsive";

/**
 * Base props interface for the GridColumn component.
 * Defines sizing options for individual grid columns.
 */
interface BaseProps extends React.HTMLAttributes<HTMLHRElement> {
  /** Width of the column in grid units (1-12) or special values.
   * - undefined: Adapts to content width
   * - auto: Fills available space
   * - 1-12: Fixed proportion of grid width
   */
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto";
}

/** Props interface combining base props with responsive behavior */
export type GridColumnProps = BaseProps & ResponsiveProps<BaseProps>;

/**
 * Column component for use within Grid.
 * Supports fixed, flexible, and responsive widths.
 *
 * @example
 * ```tsx
 * <Grid.Column
 *   size={6}
 *   responsive={{
 *     s: { size: 12 },
 *     l: { size: 4 }
 *   }}
 * />
 * ```
 *
 * @param props - Component props {@link GridColumnProps}
 * @returns React element
 */
export const GridColumn = ({
  responsive,
  ...baseProps
}: Readonly<GridColumnProps>): React.ReactElement => {
  const { size, className, style, ...otherProps } = useResponsiveProps<BaseProps>({
    baseProps,
    responsive,
  });

  const [index, setIndex] = useState<number | undefined>();
  const { columnsCount, registerColumn } = useGridContext();

  useEffect(() => {
    const { index, deregister } = registerColumn();

    setIndex(index);

    return deregister;
  }, [registerColumn]);

  return (
    <div
      style={
        {
          ...style,
          "--size": size,
          "--columns": columnsCount,
          "--index": index,
        } as React.CSSProperties
      }
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
