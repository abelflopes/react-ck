import React, { useEffect, useRef, useState } from "react";

export interface VirtualizedListItemProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "style"> {
  defaultHeight: number;
  observerRootRef: React.RefObject<HTMLDivElement | null>;
}

export const VirtualizedListItem: React.FC<Readonly<VirtualizedListItemProps>> = ({
  defaultHeight,
  children,
  observerRootRef,
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
        threshold: 0.1,
      },
    );

    const containerObserver = new IntersectionObserver(
      (entries) => {
        setIsVisibleInContainer(entries.some((entry) => entry.isIntersecting));
      },
      {
        root: observerRootRef.current,
        rootMargin: "10px",
        threshold: 0.1,
      },
    );

    viewportObserver.observe(ref.current);
    containerObserver.observe(ref.current);

    return () => {
      viewportObserver.disconnect();
      containerObserver.disconnect();
    };
  }, [observerRootRef]);

  const isVisible = isVisibleInContainer && isVisibleInViewport;

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
