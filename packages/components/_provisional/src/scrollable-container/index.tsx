import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

export interface ScrollableContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  horizontal?: boolean;
}

export const ScrollableContainer = ({
  horizontal = true,
  className,
  onScroll,
  children,
  style,
  ...otherProps
}: Readonly<ScrollableContainerProps>): React.ReactElement => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [hasScroll, setHasScroll] = useState({
    left: false,
    right: false,
    top: false,
    bottom: false,
  });

  const [scrollPos, setScrollPos] = useState({
    x: "0px",
    y: "0px",
  });

  const [show, setShow] = useState(true);
  const showTimeout = useRef<ReturnType<typeof setTimeout>>();

  const update = useCallback(() => {
    if (!rootRef.current) return;

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

    setHasScroll({ left, right, top, bottom });
  }, []);

  const handleScroll = useCallback<React.UIEventHandler<HTMLDivElement>>(
    (e) => {
      update();

      clearTimeout(showTimeout.current);
      setShow(false);

      showTimeout.current = setTimeout(() => {
        setShow(true);
      }, 200);

      onScroll?.(e);
    },
    [onScroll, update],
  );

  useEffect(update, [update]);

  useEffect(() => {
    if (!rootRef.current) return;

    const ro = new ResizeObserver(update);

    ro.observe(rootRef.current);

    return () => {
      ro.disconnect();
      clearTimeout(showTimeout.current);
    };
  }, [update]);

  return (
    <div
      ref={rootRef}
      {...otherProps}
      className={classNames(
        className,
        styles.root,
        show && {
          [`${styles["has-scroll-top"]}`]: hasScroll.top,
          [`${styles["has-scroll-right"]}`]: hasScroll.right,
          [`${styles["has-scroll-bottom"]}`]: hasScroll.bottom,
          [`${styles["has-scroll-left"]}`]: hasScroll.left,
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
