import React, { useEffect, useState } from "react";
import styles from "./styles/column.module.scss";
import classNames from "classnames";
import { useGridContext } from "./hooks";
import { useResponsiveProps, type ResponsiveProps } from "@react-ck/responsive";

interface BaseProps extends React.HTMLAttributes<HTMLHRElement> {
  /** Specifies the size of the column.
   *  - When omitted will adapt to content size
   *  - When set to `auto` fits to the available space */
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto";
}

export type GridColumnProps = BaseProps & ResponsiveProps<BaseProps>;

export const GridColumn = ({
  responsive,
  ...baseProps
}: Readonly<GridColumnProps>): React.ReactElement => {
  const { size, className, style, ...otherProps } = useResponsiveProps<BaseProps>({
    baseProps,
    responsive,
  });

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
