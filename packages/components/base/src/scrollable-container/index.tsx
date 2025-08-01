import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

/**
 * Data about the container's scroll state in all directions
 */
interface ScrollableContainerScrollData {
  /** Whether content is scrolled from the left edge */
  left: boolean;
  /** Whether content can be scrolled to the right */
  right: boolean;
  /** Whether content is scrolled from the top edge */
  top: boolean;
  /** Whether content can be scrolled to the bottom */
  bottom: boolean;
}

/**
 * Props for configuring the ScrollableContainer component
 */
export interface ScrollableContainerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Whether to show horizontal scroll indicators. Defaults to true */
  horizontal?: boolean;
  /** Callback fired when scroll position changes */
  onChange?: (data: ScrollableContainerScrollData) => void;
  /** Whether scroll detection is active. Defaults to true */
  enabled?: boolean;
  /** Whether to apply scroll indicator styles. Defaults to true */
  applyStyles?: boolean;
}

/**
 * Container that adds scroll indicators when content overflows
 * Tracks scroll position and provides visual feedback through shadows
 */
export const ScrollableContainer = ({
  horizontal = true,
  className,
  onScroll,
  children,
  style,
  onChange,
  enabled = true,
  applyStyles = true,
  ...otherProps
}: Readonly<ScrollableContainerProps>): React.ReactElement => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [scrollData, setScrollData] = useState<ScrollableContainerScrollData>({
    left: false,
    right: false,
    top: false,
    bottom: false,
  });

  const [scrollPos, setScrollPos] = useState({
    x: "0px",
    y: "0px",
  });

  const [isProcessing, setIsProcessing] = useState(true);
  const showTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const update = useCallback(() => {
    if (!rootRef.current || !enabled) return;

    const TOLERANCE = 14;

    const { scrollLeft, scrollTop, scrollHeight, scrollWidth, offsetHeight, offsetWidth } =
      rootRef.current;

    const hasScrollY = scrollHeight > offsetHeight;
    const hasScrollX = scrollWidth > offsetWidth;

    const left = hasScrollX && scrollLeft > TOLERANCE;
    const right = hasScrollX && scrollLeft < scrollWidth - offsetWidth - TOLERANCE;

    const top = hasScrollY && scrollTop > TOLERANCE;
    const bottom = hasScrollY && scrollTop < scrollHeight - offsetHeight - TOLERANCE;

    setScrollPos({
      x: `${scrollLeft}px`,
      y: `${scrollTop}px`,
    });

    setScrollData({ left, right, top, bottom });
  }, [enabled]);

  const handleScroll = useCallback<React.UIEventHandler<HTMLDivElement>>(
    (e) => {
      if (enabled) {
        update();

        if (showTimeout.current) clearTimeout(showTimeout.current);
        setIsProcessing(true);

        showTimeout.current = setTimeout(() => {
          setIsProcessing(false);
        }, 200);
      }

      onScroll?.(e);
    },
    [enabled, onScroll, update],
  );

  useEffect(update, [update]);

  useEffect(() => {
    if (!rootRef.current || !enabled) return;

    const ro = new ResizeObserver(update);

    ro.observe(rootRef.current);

    return () => {
      ro.disconnect();
      if (showTimeout.current) clearTimeout(showTimeout.current);
    };
  }, [enabled, update]);

  useEffect(() => {
    onChange?.(scrollData);
  }, [onChange, scrollData]);

  return (
    <div
      ref={rootRef}
      {...otherProps}
      className={classNames(
        className,
        styles.root,
        enabled &&
          applyStyles &&
          !isProcessing && {
            [`${styles["has-scroll-top"]}`]: scrollData.top,
            [`${styles["has-scroll-right"]}`]: scrollData.right,
            [`${styles["has-scroll-bottom"]}`]: scrollData.bottom,
            [`${styles["has-scroll-left"]}`]: scrollData.left,
          },
      )}
      style={{
        ...style,
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- needed since types do not include CSS variables
        ["--scroll-x" as keyof React.CSSProperties]: scrollPos.x,
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- needed since types do not include CSS variablesz
        ["--scroll-y" as keyof React.CSSProperties]: scrollPos.y,
      }}
      onScroll={handleScroll}>
      {horizontal ? <div className={styles.shadow_x} /> : null}
      {children}
    </div>
  );
};
