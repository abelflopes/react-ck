import classNames from "classnames";
import * as styles from "./styles/index.module.scss";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@react-ck/button";

/**
 * PaginationComponentProps interface represents the properties specific to the Pagination
 * component and React.HTMLAttributes<HTMLDivElement>
 */

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The number of maximum slots / pages to be displayed */
  slots?: number;
  /** The current active page */
  current?: number;
  /** The total number of pages */
  total: number;
  /** Callback function triggered when the active page changes
   * @param currentPage - The new active page */
  onPageChange?: (currentPage: number) => void;
}

/**
 * Pagination is an end user’s controls for navigating in between data that’s been broken up into multiple pages like a list or a document.
 * @param props - {@link PaginationProps}
 * @returns a React element
 */

export const Pagination = ({
  slots = 7,
  current = 1,
  total,
  onPageChange,
  className,
  ...otherProps
}: Readonly<PaginationProps>): React.ReactNode => {
  const [offset, setOffset] = useState(0);
  const [computedCurrent, setComputedCurrent] = useState(current);

  const computedSlots = useMemo(() => Math.min(slots, total), [slots, total]);

  const min = useMemo(
    () =>
      Math.min(
        Math.max(1, computedCurrent - Math.floor(computedSlots / 2)) + offset,
        total - (computedSlots - 1),
      ),
    [computedCurrent, computedSlots, offset, total],
  );

  const handleClick = useCallback(
    (n: number | "move-prev" | "move-next") => {
      if (typeof n === "number") setComputedCurrent(n);
      else setOffset((v) => v + Math.max(1, slots - 4) * (n === "move-next" ? 1 : -1));
    },
    [slots],
  );

  const isGotoFirst = useCallback((i: number) => i === 0 && min > 1, [min]);

  const isMovePrev = useCallback((i: number) => i === 1 && min > 1, [min]);

  const isGoToLast = useCallback(
    (i: number) => i + 1 === slots && min < total - computedSlots + 1,
    [computedSlots, min, slots, total],
  );

  const isMoveNext = useCallback(
    (i: number) => i + 2 === slots && min < total - computedSlots + 1,
    [computedSlots, min, slots, total],
  );

  const isDynamic = useCallback(
    (i: number) => !isGoToLast(i) && !isMoveNext(i) && !isMovePrev(i) && !isGotoFirst(i),
    [isGoToLast, isGotoFirst, isMoveNext, isMovePrev],
  );

  useEffect(() => {
    setComputedCurrent(current);
  }, [current]);

  useEffect(() => {
    setOffset(0);
  }, [computedCurrent]);

  useEffect(() => {
    if (computedCurrent === current) return;

    onPageChange?.(computedCurrent);
  }, [computedCurrent, current, onPageChange]);

  return (
    <div {...otherProps} className={classNames(styles.root, className)}>
      {Array.from(new Array(computedSlots).keys()).map((i) => (
        <React.Fragment key={i}>
          {isGotoFirst(i) && (
            <Button
              size="s"
              skin={computedCurrent === 1 ? "secondary" : "ghost"}
              onClick={() => {
                handleClick(1);
              }}>
              1
            </Button>
          )}

          {isMovePrev(i) && (
            <Button
              size="s"
              skin="ghost"
              onClick={() => {
                handleClick("move-prev");
              }}>
              ...
            </Button>
          )}

          {isDynamic(i) && (
            <Button
              size="s"
              skin={i + min === computedCurrent ? "secondary" : "ghost"}
              onClick={() => {
                handleClick(i + min);
              }}>
              {i + min}
            </Button>
          )}

          {isMoveNext(i) && (
            <Button
              size="s"
              skin="ghost"
              onClick={() => {
                handleClick("move-next");
              }}>
              ...
            </Button>
          )}

          {isGoToLast(i) && (
            <Button
              size="s"
              skin={total === computedCurrent ? "secondary" : "ghost"}
              onClick={() => {
                handleClick(total);
              }}>
              {total}
            </Button>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
