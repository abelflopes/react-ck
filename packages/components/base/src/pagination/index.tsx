import classNames from "classnames";
import styles from "./styles/index.module.scss";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../button";

/**
 * Props for configuring the Pagination component
 */
interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum number of page buttons to display. Defaults to 7 */
  slots?: number;
  /** Currently active page number. Defaults to 1 */
  current?: number;
  /** Total number of pages */
  total: number;
  /** Callback fired when active page changes */
  onPageChange?: (currentPage: number) => void;
}

/**
 * Navigation component for paginated content
 * Displays page buttons with first/last page shortcuts and ellipsis for large ranges
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
              skin="secondary"
              skinVariation={computedCurrent === 1 ? "muted" : "ghost"}
              onClick={() => {
                handleClick(1);
              }}>
              1
            </Button>
          )}

          {isMovePrev(i) && (
            <Button
              size="s"
              skin="secondary"
              skinVariation="ghost"
              onClick={() => {
                handleClick("move-prev");
              }}>
              ...
            </Button>
          )}

          {isDynamic(i) && (
            <Button
              size="s"
              skin="secondary"
              skinVariation={i + min === computedCurrent ? "muted" : "ghost"}
              onClick={() => {
                handleClick(i + min);
              }}>
              {i + min}
            </Button>
          )}

          {isMoveNext(i) && (
            <Button
              size="s"
              skin="secondary"
              skinVariation="ghost"
              onClick={() => {
                handleClick("move-next");
              }}>
              ...
            </Button>
          )}

          {isGoToLast(i) && (
            <Button
              size="s"
              skin="secondary"
              skinVariation={total === computedCurrent ? "muted" : "ghost"}
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
