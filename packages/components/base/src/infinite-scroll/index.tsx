import React, { useEffect, useMemo, useRef, useState } from "react";
import { Skeleton } from "../skeleton";
import { Spinner } from "../spinner";
import { Button } from "../button";

const defaultContentWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div>{children}</div>
);

export const InfiniteScroll: React.FC<
  React.PropsWithChildren<{
    loaded?: number;
    loading: boolean;
    loadingElement?: React.ReactNode;
    loadingMore: boolean;
    loadingMoreElement?: React.ReactNode;
    total?: number;
    displayLoadMore?: boolean;
    onLoadMore: () => void;
    loadMoreButton?: React.ReactNode | ((props: { loadMore: () => void }) => React.ReactNode);
    ContentWrapper?: React.FC<React.PropsWithChildren>;
  }>
> = ({
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
}) => {
  const intersectionRef = useRef<HTMLDivElement>(null);

  const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(!displayLoadMore);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const hasItemsLeft = useMemo(
    () => (loaded === undefined && total === undefined) || (loaded ?? 0) < (total ?? 0),
    [loaded, total],
  );

  const LoadMoreButton = useMemo(() => {
    if (!displayLoadMore) return null;
    if (typeof loadMoreButton === "function") {
      return loadMoreButton({ loadMore: () => setInfiniteScrollEnabled(true) });
    }
    return (
      <Button
        fullWidth
        onClick={() => {
          setInfiniteScrollEnabled(true);
        }}
        skinVariation="bordered">
        {loadMoreButton}
      </Button>
    );
  }, [loadMoreButton, displayLoadMore]);

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
  }, [onLoadMore, infiniteScrollEnabled, children, hasItemsLeft]);

  useEffect(() => {
    if (!isIntersecting || !infiniteScrollEnabled || loadingMore || loading || !hasItemsLeft)
      return;

    onLoadMore();
  }, [isIntersecting, onLoadMore, infiniteScrollEnabled, loadingMore, loading, hasItemsLeft]);

  return (
    <>
      {hasItemsLeft && loading && (loadingElement ?? <Skeleton />)}

      {children && (
        <ContentWrapper>
          {children}
          <div ref={intersectionRef} />
        </ContentWrapper>
      )}

      {hasItemsLeft && loadingMore && (loadingMoreElement ?? <Spinner />)}

      {displayLoadMore && !infiniteScrollEnabled && hasItemsLeft && LoadMoreButton}
    </>
  );
};
