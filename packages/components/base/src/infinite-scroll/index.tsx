import React, { useEffect, useMemo, useReducer, useRef } from "react";
import { Skeleton, Spinner, Button } from "react-ck";

const DefaultContentWrapper: React.FC<React.PropsWithChildren> = ({ children }) => children;

/**
 * Props for the InfiniteScroll component that handles automatic loading of content
 * as the user scrolls or clicks a load more button.
 */
export interface InfiniteScrollProps {
  /**
   * Direction of infinite scroll - adapts the behaviour according to the scroll direction
   * @default "bottom"
   */
  direction?: "bottom" | "top";
  /** Number of items currently loaded - used to determine if more items are available */
  loaded?: number;
  /** Total number of items available - used with loaded to determine remaining items */
  total?: number;
  /** Whether initial content is currently loading */
  loading: boolean;
  /** Custom element to display during initial loading (defaults to Skeleton) */
  loadingElement?: React.ReactNode;
  /** Whether additional content is currently being loaded */
  loadingMore: boolean;
  /** Custom element to display while loading more content (defaults to Spinner) */
  loadingMoreElement?: React.ReactNode;
  /**
   * Whether to show a "Load more" button instead of automatic infinite scroll
   * @default true
   */
  displayLoadMore?: boolean;
  /** Function called when more content should be loaded */
  onLoadMore: (() => void) | (() => Promise<void>);
  /** Custom button element or render function for the load more button */
  loadMoreButton?: React.ReactNode | ((props: { loadMore: () => void }) => React.ReactNode);
  /** Custom wrapper component for the content area */
  ContentWrapper?: typeof DefaultContentWrapper;
  /** Additional props passed to the intersection observer element */
  intersectionElementProps?: React.ComponentPropsWithoutRef<"div">;
  /** Mode of the infinite scroll */
  mode?: "infinite" | "enable-once" | "pagination";
}

interface InfiniteScrollStatus {
  /** Whether the infinite scroll is enabled */
  infiniteScrollEnabled: boolean;
  /** Whether the intersection observer is intersecting */
  isIntersecting: boolean;
}

export const InfiniteScroll: React.FC<React.PropsWithChildren<InfiniteScrollProps>> = ({
  direction = "bottom",
  children,
  displayLoadMore = true,
  loaded,
  total,
  loading,
  loadingMore,
  loadingElement,
  loadingMoreElement,
  onLoadMore,
  loadMoreButton = "Load more",
  ContentWrapper = DefaultContentWrapper,
  intersectionElementProps,
  mode = loadMoreButton ? "enable-once" : "infinite",
}) => {
  // Intersection ref
  const intersectionRef = useRef<HTMLDivElement>(null);

  // Status
  const [{ infiniteScrollEnabled, isIntersecting }, setStatus] = useReducer(
    (prev: InfiniteScrollStatus, next: Partial<InfiniteScrollStatus>) => {
      return { ...prev, ...next };
    },
    {
      infiniteScrollEnabled: mode === "infinite",
      isIntersecting: false,
    },
  );

  // Has items left
  const hasItemsLeft = useMemo(() => (loaded ?? 0) < (total ?? 0), [loaded, total]);

  // Load more button
  const LoadMoreButton = useMemo(() => {
    if (!displayLoadMore) return;

    const action = () => {
      if (mode === "enable-once") {
        setStatus({ infiniteScrollEnabled: true });
      } else {
        if (loading) return;
        void onLoadMore();
      }
    };

    if (typeof loadMoreButton === "function") {
      return loadMoreButton({
        loadMore: action,
      });
    }

    return (
      <Button skinVariation="bordered" fullWidth onClick={action}>
        {loadMoreButton}
      </Button>
    );
  }, [displayLoadMore, loadMoreButton, loading, mode, onLoadMore]);

  // Intersection observer
  useEffect(() => {
    if (!intersectionRef.current || !infiniteScrollEnabled || !children || !hasItemsLeft) return;

    // eslint-disable-next-line compat/compat -- IntersectionObserver is not supported old browsers, but we target modern browsers
    const observer = new IntersectionObserver((entries) => {
      const isIntersecting = entries.some((entry) => entry.isIntersecting);
      setStatus({ isIntersecting });
    });

    observer.observe(intersectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [children, hasItemsLeft, infiniteScrollEnabled]);

  // Load more
  useEffect(() => {
    if (
      !isIntersecting ||
      !infiniteScrollEnabled ||
      loadingMore ||
      loading ||
      !hasItemsLeft ||
    ) {
      return;
    }
        void onLoadMore();

  }, [
    hasItemsLeft,
    infiniteScrollEnabled,
    isIntersecting,
    loading,
    loadingMore,
    onLoadMore,
  ]);

  // Load more controls
  const LoadMoreControls = useMemo(() => {
    if (loadingMore) {
      return loadingMoreElement ?? <Spinner />;
    }

    return displayLoadMore && hasItemsLeft && !infiniteScrollEnabled && LoadMoreButton;
  }, [
    LoadMoreButton,
    displayLoadMore,
    hasItemsLeft,
    infiniteScrollEnabled,
    loadingMore,
    loadingMoreElement,
  ]);

  // Loading element
  if (loading) {
    return loadingElement ?? <Skeleton />;
  }

  return (
    <ContentWrapper>
      {direction === "top" && (
        <>
          {LoadMoreControls}
          <div ref={intersectionRef} {...intersectionElementProps} />
        </>
      )}

      {children}

      {direction === "bottom" && (
        <>
          <div ref={intersectionRef} {...intersectionElementProps} />
          {LoadMoreControls}
        </>
      )}
    </ContentWrapper>
  );
};
