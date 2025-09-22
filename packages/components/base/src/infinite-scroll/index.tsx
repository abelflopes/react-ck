import React, { useEffect, useMemo, useRef, useState } from "react";
import { Skeleton } from "../skeleton";
import { Spinner } from "../spinner";
import { Button } from "../button";

const defaultContentWrapper: React.FC<React.PropsWithChildren> = ({ children }) => <>{children}</>;

/**
 * Props for the InfiniteScroll component that handles automatic loading of content
 * as the user scrolls or clicks a load more button.
 */
export interface InfiniteScrollProps {
  /** Direction of infinite scroll - adapts the behaviour according to the scroll direction */
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
  /** Whether to show a "Load more" button instead of automatic infinite scroll */
  displayLoadMore?: boolean;
  /** Function called when more content should be loaded */
  onLoadMore: (() => void) | (() => Promise<void>);
  /** Custom button element or render function for the load more button */
  loadMoreButton?: React.ReactNode | ((props: { loadMore: () => void }) => React.ReactNode);
  /** Custom wrapper component for the content area */
  ContentWrapper?: React.FC<React.PropsWithChildren>;
  /** Additional props passed to the intersection observer element */
  intersectionElementProps?: React.ComponentPropsWithoutRef<"div">;
  mode?: "infinite" | "enable-once" | "pagination";
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
  ContentWrapper = defaultContentWrapper,
  intersectionElementProps,
  mode = loadMoreButton ? "enable-once" : "infinite",
}) => {
  const intersectionRef = useRef<HTMLDivElement>(null);

  const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(mode === "infinite");
  const [isIntersecting, setIsIntersecting] = useState(false);

  const hasItemsLeft = useMemo(
    () => (loaded === undefined && total === undefined) || (loaded ?? 0) < (total ?? 0),
    [loaded, total],
  );

  const LoadMoreButton = useMemo(() => {
    if (!displayLoadMore) return null;

    const action = () => {
      if (mode === "enable-once") {
        setInfiniteScrollEnabled(true);
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

  const elements = useMemo<React.ReactNode[]>(() => {
    const elements = [
      hasItemsLeft && loading ? (loadingElement ?? <Skeleton />) : null,
      children ? (
        <ContentWrapper>
          {direction === "top" && <div ref={intersectionRef} {...intersectionElementProps} />}
          {children}
          {direction === "bottom" && <div ref={intersectionRef} {...intersectionElementProps} />}
        </ContentWrapper>
      ) : null,
      hasItemsLeft && loadingMore ? (loadingMoreElement ?? <Spinner />) : null,
      displayLoadMore && !infiniteScrollEnabled && hasItemsLeft && !loading && !loadingMore
        ? LoadMoreButton
        : null,
    ];

    return direction === "bottom" ? elements : elements.reverse();
  }, [
    hasItemsLeft,
    loading,
    loadingElement,
    children,
    ContentWrapper,
    intersectionRef,
    loadingMore,
    loadingMoreElement,
    displayLoadMore,
    infiniteScrollEnabled,
    LoadMoreButton,
    direction,
    intersectionElementProps,
  ]);

  useEffect(() => {
    if (!intersectionRef.current || !infiniteScrollEnabled || !children || !hasItemsLeft) return;

    const observer = new IntersectionObserver((entries) => {
      const isIntersecting = entries.some((entry) => entry.isIntersecting);
      setIsIntersecting(isIntersecting);
    });

    observer.observe(intersectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [children, hasItemsLeft, infiniteScrollEnabled]);

  useEffect(() => {
    if (!isIntersecting || !infiniteScrollEnabled || loadingMore || loading || !hasItemsLeft)
      return;

    void onLoadMore();
  }, [hasItemsLeft, infiniteScrollEnabled, isIntersecting, loading, loadingMore, onLoadMore]);

  return <>{elements}</>;
};
