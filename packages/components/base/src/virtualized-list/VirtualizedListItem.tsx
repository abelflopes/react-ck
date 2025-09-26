import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { megeRefs as mergeRefs } from "react-ck";

export interface VirtualizedListItemProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "style"> {
  /** Default height of the item */
  defaultHeight: number;
  /** Reference to the observer root */
  observerRootRef: React.RefObject<HTMLDivElement | null>;
  /**
   * Threshold for the visibility observer
   * @default 0
   */
  threshold?: number;
  /**
   * Controls viewport partial observer behavior
   * @default "never"
   */
  keepVisibleWhen?: "above" | "below" | "never";
  /** Called when the item is rendered */
  onMount?: () => void;
}

export const VirtualizedListItem = forwardRef<HTMLDivElement, VirtualizedListItemProps>(
  function Root(
    {
      defaultHeight,
      children,
      observerRootRef,
      threshold = 0,
      onMount,
      keepVisibleWhen = "never",
      ...props
    },
    ref,
  ) {
    const innerRef = useRef<HTMLDivElement>(null);

    const [isVisibleInContainer, setIsVisibleInContainer] = useState(false);
    const [isVisibleInViewport, setIsVisibleInViewport] = useState(false);

    const heightWhenInvisible = useRef(defaultHeight);

    useEffect(() => {
      const el = innerRef.current;
      if (!el || !observerRootRef.current) return;

      // eslint-disable-next-line compat/compat -- Not supported old browsers, but we target modern browsers
      const partialObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const { top, bottom } = entry.boundingClientRect;
            const vh = window.innerHeight;

            setIsVisibleInViewport(
              entry.isIntersecting ||
                (keepVisibleWhen === "above" && bottom < 0) ||
                (keepVisibleWhen === "below" && top > vh),
            );
          });
        },
        {
          rootMargin: "10px",
          threshold,
        },
      );

      // eslint-disable-next-line compat/compat -- Not supported old browsers, but we target modern browsers
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

      containerObserver.observe(el);
      partialObserver.observe(el);

      return () => {
        // Disconnect the observers
        containerObserver.disconnect();
        partialObserver.disconnect();
      };
    }, [observerRootRef, threshold, keepVisibleWhen]);

    const isVisible = useMemo(
      () => isVisibleInContainer && isVisibleInViewport,
      [isVisibleInContainer, isVisibleInViewport],
    );

    useEffect(() => {
      if (isVisible) {
        heightWhenInvisible.current = innerRef.current?.offsetHeight ?? 0;
      }
    }, [isVisible]);

    useEffect(() => {
      onMount?.();
    }, [onMount]);

    return (
      <div
        {...props}
        ref={mergeRefs(ref, innerRef)}
        style={{ height: isVisible ? "auto" : heightWhenInvisible.current }}>
        {isVisible ? children : null}
      </div>
    );
  },
);
