import React, { useEffect, useMemo, useRef, useState } from "react";
import { Skeleton } from "../skeleton";
import { Spinner } from "../spinner";
import { Button } from "../button";

const defaultContentWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div>{children}</div>
);

export const InfiniteScroll: React.FC<
  React.PropsWithChildren<{
    readonly loaded?: number;
    readonly loading: boolean;
    readonly loadingElement?: React.ReactNode;
    readonly loadingMore: boolean;
    readonly loadingMoreElement?: React.ReactNode;
    readonly total?: number;
    readonly displayLoadMore?: boolean;
    readonly onLoadMore: () => void;
    readonly loadMoreButton?:
      | React.ReactNode
      | ((props: { loadMore: () => void }) => React.ReactNode);
    readonly ContentWrapper?: React.FC<React.PropsWithChildren>;
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
      return loadMoreButton({
        loadMore: () => {
          setInfiniteScrollEnabled(true);
        },
      });
    }

    return (
      <Button
        skinVariation="bordered"
        fullWidth
        onClick={() => {
          setInfiniteScrollEnabled(true);
        }}>
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
      {hasItemsLeft && loading ? (loadingElement ?? <Skeleton />) : null}

      {children ? (
        <ContentWrapper>
          {children}
          <div ref={intersectionRef} />
        </ContentWrapper>
      ) : null}

      {hasItemsLeft && loadingMore ? (loadingMoreElement ?? <Spinner />) : null}

      {displayLoadMore && !infiniteScrollEnabled && hasItemsLeft ? LoadMoreButton : null}
    </>
  );
};
