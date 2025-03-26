import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

interface ScrollableContainerScrollData {
  left: boolean;
  right: boolean;
  top: boolean;
  bottom: boolean;
}

export interface ScrollableContainerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  horizontal?: boolean;
  onChange?: (data: ScrollableContainerScrollData) => void;
  enabled?: boolean;
  applyStyles?: boolean;
}

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
  const showTimeout = useRef<ReturnType<typeof setTimeout>>();

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

        clearTimeout(showTimeout.current);
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
      clearTimeout(showTimeout.current);
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
