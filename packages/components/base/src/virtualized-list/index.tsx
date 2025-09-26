import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { VirtualizedListItem, type VirtualizedListItemProps } from "./VirtualizedListItem";
import { useManagerContext } from "@react-ck/manager";

const DefaultWrapper: React.FC<React.PropsWithChildren> = ({ children }) => children;

const keyMap = new Map<React.ReactNode, string>();

/**
 * Generate a stable key for an item
 * @param item - The item to generate a stable key for
 * @param generateUniqueId - The function to generate a unique id
 * @returns The stable key for the item
 */
function generateStableKey(item: React.ReactNode, generateUniqueId: () => string): string {
  const currentKey = keyMap.get(item);

  if (currentKey) return currentKey;

  const key = generateUniqueId();
  keyMap.set(item, key);
  return key;
}

export interface VirtualizedListRef {
  /**
   * Scroll to the index of the item
   * @param index - The index of the item to scroll to
   * @param options - The options to scroll to the item
   */
  scrollToIndex: (index: number, options?: ScrollIntoViewOptions) => void;
}

export interface VirtualizedListITem {
  /** The element to render as a list item */
  element: React.ReactNode;
  /** The key for the item */
  key?: string;
}

export interface VirtualizedListProps
  extends Pick<VirtualizedListItemProps, "keepVisibleWhen">,
    Omit<React.ComponentPropsWithRef<"div">, "children"> {
  /** Array of React nodes to render as list items */
  items: React.ReactNode[] | VirtualizedListITem[];
  /** Default height for list items in pixels */
  defaultItemHeight?: number;
  /** Additional props to pass to each VirtualizedListItem */
  itemProps?: Omit<VirtualizedListItemProps, "observerRootRef" | "defaultHeight">;
  /** Custom wrapper component for the list items */
  Wrapper?: React.FC<React.PropsWithChildren>;
  /** Called when all virtualized items are rendered */
  onItemsMounted?: () => void;
  /**
   * Called when rendering state changes
   * @param options - The options for the rendering state
   */
  onRenderingChange?: (options: {
    /** Whether the list is rendering */
    isRendering: boolean;
  }) => void;
}

export const VirtualizedList = forwardRef(function Root(
  {
    items,
    defaultItemHeight = 40,
    itemProps,
    Wrapper = DefaultWrapper,
    onItemsMounted,
    onRenderingChange,
    keepVisibleWhen,
    ...props
  }: VirtualizedListProps,
  ref: React.Ref<VirtualizedListRef>,
) {
  const { generateUniqueId } = useManagerContext();

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
          // Scroll to the index of the item if the node is an HTMLElement
          node.scrollIntoView(options);
        }
      },
    }),
    [],
  );

  useEffect(() => {
    // Set the rendering change to true when the component is mounted
    onRenderingChange?.({ isRendering: true });
  }, [onRenderingChange]);

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
              // Set the node element to items references, required to scroll to the correct index
              itemRefs.current[index] = node;

              // Set the rendering change to true if the items references are not the same as the items with key
              onRenderingChange?.({ isRendering: itemRefs.current.length !== itemsWithKey.length });
            }}
            onMount={() => {
              // Call the on items mounted function when the item is mounted
              onItemsMounted?.();
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
