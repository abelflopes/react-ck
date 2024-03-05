import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

export type ScrollableContainerProps = React.HTMLAttributes<HTMLDivElement>;

export const ScrollableContainer = ({
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
    };
  }, [update]);

  return (
    <div
      ref={rootRef}
      {...otherProps}
      className={classNames(className, styles.root, {
        [`${styles["has-scroll-top"]}`]: hasScroll.top,
        [`${styles["has-scroll-right"]}`]: hasScroll.right,
        [`${styles["has-scroll-bottom"]}`]: hasScroll.bottom,
        [`${styles["has-scroll-left"]}`]: hasScroll.left,
      })}
      style={{
        ...style,
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- needed since types do not include CSS variables
        ["--scroll-x" as keyof React.CSSProperties]: scrollPos.x,
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- needed since types do not include CSS variablesz
        ["--scroll-y" as keyof React.CSSProperties]: scrollPos.y,
      }}
      onScroll={handleScroll}>
      <div className={styles.shadow_x} />
      {children}
    </div>
  );
};
