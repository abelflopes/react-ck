import React, { useRef, useEffect, useState, useMemo } from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { raf } from "@react-ck/react-utils";

/**
 * Props interface for the Expandable component.
 */
export interface ExpandableProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content to be rendered inside the expandable container */
  children: React.ReactNode;
  /** Whether the component is expanded */
  expanded?: boolean;
  /** Whether to animate the initial render */
  animateInitial?: boolean;
}

/**
 * A component that smoothly animates height changes of its children.
 * Uses ResizeObserver to detect content height changes and applies
 * smooth CSS transitions.
 *
 * @example
 * ```tsx
 * <Expandable expanded={isOpen} duration={400}>
 *   <div>Dynamic content that changes height</div>
 * </Expandable>
 * ```
 *
 * @param props - Component props {@link ExpandableProps}
 * @returns React element
 */
export const Expandable = ({
  children,
  expanded = true,
  animateInitial = false,
  className,
  style,
  ...otherProps
}: Readonly<ExpandableProps>): React.ReactElement => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [height, setHeight] = useState<number | undefined>(
    (isInitialRender && animateInitial) || !expanded ? 0 : undefined,
  );

  const targetHeight = useMemo(() => (expanded ? height : 0), [expanded, height]);

  const containerStyle = useMemo<React.CSSProperties>(
    () => ({
      ...style,
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- this is a valid use case
      ...({
        "--expandable-height": targetHeight === undefined ? "auto" : `${targetHeight}px`,
      } as React.CSSProperties),
    }),
    [style, targetHeight],
  );

  // Update height when content changes
  useEffect(() => {
    if (!contentRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const newHeight = entry.contentRect.height;

        setHeight(newHeight);
      });
    });

    resizeObserver.observe(contentRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [setHeight]);

  // Update height when props change
  useEffect(() => {
    if (!contentRef.current) return;

    const isZero = isInitialRender && animateInitial;

    const initialHeight = contentRef.current.scrollHeight;

    if (isZero) setHeight(0);
    else setHeight(initialHeight);

    if (isInitialRender && animateInitial) {
      raf(() => {
        setHeight(initialHeight);
      });
    }
  }, [setHeight, expanded, isInitialRender, animateInitial]);

  useEffect(() => {
    setIsInitialRender(false);
  }, []);

  return (
    <div style={containerStyle} className={classNames(styles.container, className)} {...otherProps}>
      <div ref={contentRef} className={styles.content}>
        {children}
      </div>
    </div>
  );
};
