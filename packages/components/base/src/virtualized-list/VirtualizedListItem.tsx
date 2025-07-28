import React, { useEffect, useMemo, useRef, useState } from "react";

export interface VirtualizedListItemProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "style"> {
  defaultHeight: number;
  observerRootRef: React.RefObject<HTMLDivElement | null>;
  threshold?: number;
}

export const VirtualizedListItem: React.FC<Readonly<VirtualizedListItemProps>> = ({
  defaultHeight,
  children,
  observerRootRef,
  threshold = 0,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisibleInContainer, setIsVisibleInContainer] = useState(false);
  const [isVisibleInViewport, setIsVisibleInViewport] = useState(false);
  const heightWhenInvisible = useRef(defaultHeight);

  useEffect(() => {
    if (!ref.current || !observerRootRef.current) return;

    const viewportObserver = new IntersectionObserver(
      (entries) => {
        setIsVisibleInViewport(entries.some((entry) => entry.isIntersecting));
      },
      {
        rootMargin: "10px",
        threshold,
      },
    );

    const containerObserver = new IntersectionObserver(
      (entries) => {
        setIsVisibleInContainer(entries.some((entry) => entry.isIntersecting));
      },
      {
        root: observerRootRef.current,
        rootMargin: "10px",
        threshold,
      },
    );

    viewportObserver.observe(ref.current);
    containerObserver.observe(ref.current);

    return () => {
      viewportObserver.disconnect();
      containerObserver.disconnect();
    };
  }, [observerRootRef, threshold]);

  const isVisible = useMemo(
    () => isVisibleInContainer && isVisibleInViewport,
    [isVisibleInContainer, isVisibleInViewport],
  );

  useEffect(() => {
    if (!isVisible) return;

    heightWhenInvisible.current = ref.current?.offsetHeight ?? 0;
  }, [isVisible]);

  return (
    <div {...props} ref={ref} style={{ height: isVisible ? "auto" : heightWhenInvisible.current }}>
      {isVisible ? children : null}
    </div>
  );
};
