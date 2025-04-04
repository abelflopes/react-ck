// React
import React, { type ComponentProps, useMemo } from "react";
// Utils
import classNames from "classnames";
// Styles
import styles from "./styles/index.module.scss";
import {
  PolymorphicComponent,
  type ConsumerPolymorphicProps,
  type HTMLTag,
} from "@react-ck/react-utils";

/**
 * Props for configuring the Skeleton component
 */
interface SkeletonProps<T extends HTMLTag = "span">
  extends ComponentProps<"span">,
    ConsumerPolymorphicProps<T> {
  /** Visual style of the loading placeholder. Defaults to "default" */
  variation?: "default" | "text" | "content";
}

/**
 * Loading placeholder with animated shimmer effect
 * Supports text and default variations for different content types
 */
export const Skeleton = <T extends HTMLTag>({
  as,
  variation = "default",
  className,
  style,
  children,
  ...otherProps
}: Readonly<SkeletonProps<T>>): React.ReactElement => {
  const sizeMulti = useMemo(() => Math.round(Math.random() * 100) / 100, []);

  return (
    <PolymorphicComponent
      as={as}
      fallback={["span", otherProps]}
      commonProps={{
        className: classNames(styles.root, styles[`variation_${variation}`], className),
        style: {
          ...style,
          ...{
            "--size-multi": sizeMulti,
          },
        },
        ...otherProps,
      }}>
      {children}
    </PolymorphicComponent>
  );
};
