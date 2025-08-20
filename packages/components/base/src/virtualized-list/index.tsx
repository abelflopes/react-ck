import React, { useMemo, useRef } from "react";
import { VirtualizedListItem, type VirtualizedListItemProps } from "./VirtualizedListItem";
import { useManagerContext } from "@react-ck/manager";

const DefaultWrapper: React.FC<React.PropsWithChildren> = ({ children }) => children;

const keyMap = new Map<React.ReactNode, string>();

function generateStableKey(item: React.ReactNode, generateUniqueId: () => string): string {
  const currentKey = keyMap.get(item);

  if (currentKey) return currentKey;

  const key = generateUniqueId();
  keyMap.set(item, key);
  return key;
}

/**
 * Props for the VirtualizedList component
 */
export interface VirtualizedListProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
  /** Array of React nodes to render as list items */
  items: React.ReactNode[];
  /** Default height for list items in pixels */
  defaultItemHeight?: number;
  /** Additional props to pass to each VirtualizedListItem */
  itemProps?: Omit<VirtualizedListItemProps, "observerRootRef" | "defaultHeight">;
  /** Custom wrapper component for the list items */
  Wrapper?: React.FC<React.PropsWithChildren>;
}

/**
 * A virtualized list component that efficiently renders large lists
 * by only rendering visible items and using stable keys for performance
 */
export const VirtualizedList: React.FC<Readonly<VirtualizedListProps>> = ({
  items,
  defaultItemHeight = 40,
  itemProps,
  Wrapper = DefaultWrapper,
  ...props
}) => {
  const { generateUniqueId } = useManagerContext();

  const observerRootRef = useRef<HTMLDivElement>(null);

  const itemsWithKey = useMemo(
    () =>
      items.map((item) => ({
        item,
        key: generateStableKey(item, generateUniqueId),
      })),
    [items, generateUniqueId],
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
