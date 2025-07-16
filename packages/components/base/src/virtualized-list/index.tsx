import React, { useMemo, useRef } from "react";
import { VirtualizedListItem, type VirtualizedListItemProps } from "./VirtualizedListItem";

const DefaultWrapper: React.FC<React.PropsWithChildren> = ({ children }) => children;

export interface VirtualizedListProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
  items: React.ReactNode[];
  defaultItemHeight?: number;
  itemProps?: Omit<VirtualizedListItemProps, "observerRootRef" | "defaultHeight">;
  Wrapper?: React.FC<React.PropsWithChildren>;
}

export const VirtualizedList: React.FC<Readonly<VirtualizedListProps>> = ({
  items,
  defaultItemHeight = 40,
  itemProps,
  Wrapper = DefaultWrapper,
  ...props
}) => {
  const observerRootRef = useRef<HTMLDivElement>(null);

  const itemsWithKey = useMemo(
    () =>
      items.map((item) => ({
        item,
        key: Math.random().toString(36).substring(2, 15),
      })),
    [items],
  );

  return (
    <div ref={observerRootRef} {...props}>
      <Wrapper>
        {itemsWithKey.map(({ item, key }) => (
          <VirtualizedListItem
            key={key}
            defaultHeight={defaultItemHeight}
            observerRootRef={observerRootRef}
            {...itemProps}>
            {item}
          </VirtualizedListItem>
        ))}
      </Wrapper>
    </div>
  );
};
