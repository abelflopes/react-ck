import React, { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
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

export interface VirtualizedListRef {
  /**
   * Scrolls the list to the item at the specified index.
   *
   * @param index - The zero-based index of the item to scroll into view.
   * @param options - Optional configuration for scrolling behavior (e.g., `behavior`, `block`, `inline`).
   */
  scrollToIndex: (index: number, options?: ScrollIntoViewOptions) => void;
}

export interface VirtualizedListItem {
  /** The rendered content of the item. */
  element: React.ReactNode;
  /** Optional unique key for the item. Useful for stable rendering and reconciliation. */
  key?: string;
}

/**
 * Props for the VirtualizedList component
 */
export interface VirtualizedListProps
  extends Pick<VirtualizedListItemProps, "keepVisibleWhen">,
    Omit<React.ComponentPropsWithRef<"div">, "children"> {
  /** Array of React nodes to render as list items */
  items: React.ReactNode[] | VirtualizedListItem[];
  /** Default height for list items in pixels */
  defaultItemHeight?: number;
  /** Additional props to pass to each VirtualizedListItem */
  itemProps?: Omit<VirtualizedListItemProps, "observerRootRef" | "defaultHeight">;
  /** Custom wrapper component for the list items */
  Wrapper?: React.FC<React.PropsWithChildren>;
  /** Called when all virtualized items are rendered */
  onItemsMounted?: () => void;
}

/**
 * A virtualized list component that efficiently renders large lists
 * by only rendering visible items and using stable keys for performance
 */
export const VirtualizedList = forwardRef(function Root(
  {
    items,
    defaultItemHeight = 40,
    itemProps,
    Wrapper = DefaultWrapper,
    onItemsMounted,
    keepVisibleWhen,
    ...props
  }: VirtualizedListProps,
  ref: React.Ref<VirtualizedListRef>,
) {
  const { generateUniqueId } = useManagerContext();

  const mountedCount = useRef(0);

  const observerRootRef = useRef<HTMLDivElement>(null);

  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  const itemsWithKey = useMemo(
    () =>
      items.map((item) => {
        if (typeof item === "object" && item !== null && "element" in item) {
          return {
            element: item.element,
            key: item.key ?? generateStableKey(item.element, generateUniqueId),
          };
        }

        return {
          element: item,
          key: generateStableKey(item, generateUniqueId),
        };
      }),
    [items, generateUniqueId],
  );

  useImperativeHandle(
    ref,
    () => ({
      scrollToIndex: (index, options) => {
        const node = itemRefs.current[index];
        if (node instanceof HTMLElement) {
          node.scrollIntoView(options);
        }
      },
    }),
    [],
  );

  return (
    <div ref={observerRootRef} {...props}>
      <Wrapper>
        {itemsWithKey.map(({ element, key }, index) => (
          <VirtualizedListItem
            key={key}
            ref={(node) => {
              if (!node) {
                return;
              }
              itemRefs.current[index] = node;
            }}
            onRendered={() => {
              mountedCount.current += 1;

              if (mountedCount.current === itemsWithKey.length) {
                onItemsMounted?.();
              }
            }}
            defaultHeight={defaultItemHeight}
            observerRootRef={observerRootRef}
            keepVisibleWhen={keepVisibleWhen}
            {...itemProps}>
            {element}
          </VirtualizedListItem>
        ))}
      </Wrapper>
    </div>
  );
});
