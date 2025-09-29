import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { type VirtualizedListItemProps, VirtualizedListItem } from "./VirtualizedListItem";
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
  /**
   * Called when rendering state changes
   * @param options - The options for the rendering state
   */
  onItemsChange?: (options: {
    /** Whether the list is rendering */
    isRendering: boolean;
    /** Whether all items have been mounted in the DOM */
    isMounted: boolean;
  }) => void;
}

export const VirtualizedList = forwardRef(function Root(
  {
    items,
    defaultItemHeight = 40,
    itemProps,
    Wrapper = DefaultWrapper,
    onItemsChange,
    keepVisibleWhen,
    ...props
  }: VirtualizedListProps,
  ref: React.Ref<VirtualizedListRef>,
) {
  // Unique ID generator provided by context, used to create stable keys
  const { generateUniqueId } = useManagerContext();

  // Ref to the scroll container, passed as the IntersectionObserver root
  const observerRootRef = useRef<HTMLDivElement>(null);

  // Holds refs to each individual item element, indexed by item position
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  // Tracks whether all items in the list have been mounted in the DOM.
  const [mounted, setMounted] = useState(false);

  // Normalize items into objects that always have a stable key + element
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

  // Resets item refs and signals that the list has started rendering whenever
  // the `items` array changes.
  useEffect(() => {
    if (!items.length) return;

    // clear refs for new items
    itemRefs.current = [];

    // Notify consumer that rendering has started
    onItemsChange?.({ isRendering: true, isMounted: mounted });
  }, [items, mounted, onItemsChange]);

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

              // check against count, not array length
              if (itemRefs.current.length === itemsWithKey.length) {
                setMounted(true);
                onItemsChange?.({ isRendering: false, isMounted: mounted });
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
