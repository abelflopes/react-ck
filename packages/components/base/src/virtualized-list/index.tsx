import React, { useRef } from "react";
import { VirtualizedListItem, VirtualizedListItemProps } from "./VirtualizedListItem";

const DefaultWrapper: React.FC<React.PropsWithChildren> = ({ children }) => <>{children}</>;

export interface VirtualizedListProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
  items: React.ReactNode[];
  defaultItemHeight?: number;
  itemProps?: Omit<VirtualizedListItemProps, "observerRootRef" | "defaultHeight">;
  Wrapper?: React.FC<React.PropsWithChildren>;
}

export const VirtualizedList: React.FC<VirtualizedListProps> = ({
  items,
  defaultItemHeight = 40,
  itemProps,
  Wrapper = DefaultWrapper,
  ...props
}) => {
  const observerRootRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={observerRootRef} {...props}>
      <Wrapper>
        {items.map((item, key) => (
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
