import classNames from "classnames";
import styles from "./styles/index.module.scss";
import React, { useMemo, useState } from "react";
import { CardContext, type CardContextValue } from "./context";
import { CardImage } from "./CardImage";
import {
  PolymorphicComponent,
  type ConsumerPolymorphicProps,
  type HTMLTag,
} from "@react-ck/react-utils";

/**
 * Props interface for the Card component.
 * Defines visual and behavioral options for the card container.
 */
interface CardProps<T extends HTMLTag = "div">
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    ConsumerPolymorphicProps<T> {
  /** Visual style of the card's container.
   * @default "bordered"
   */
  skin?: "bordered" | "shadowed" | "ghost" | "light";
  /** Whether the card is in a selected state with primary highlight border.
   * @default false
   */
  selected?: boolean;
  /** Whether the card is disabled with reduced opacity and grayscale filter.
   * @default false
   */
  disabled?: boolean;
  /** Interactive behavior on user interaction.
   * - hover: Visual feedback on hover
   * - click: Visual feedback on hover and click
   */
  interaction?: "hover" | "click";
  /** Layout direction of the card's content.
   * @default "vertical"
   */
  variation?: "vertical" | "horizontal";
  /** Internal padding of the card's content.
   * @default "m"
   */
  spacing?: "s" | "m" | "l" | "none";
  /** Corner radius of the card.
   * @default same as spacing
   */
  borderRadius?: "s" | "m" | "l" | "none";
  /** Makes the card fill its container's height.
   * Useful for consistent heights in grid layouts.
   * @default false
   */
  fullHeight?: boolean;
}

/**
 * Container component for grouping related content and actions.
 * Supports images, interactive states, and flexible layouts.
 *
 * @example
 * ```tsx
 * <Card skin="shadowed" interaction="hover">
 *   <Card.Image src="image.jpg" alt="Card image" />
 *   <Text>Card content</Text>
 * </Card>
 * ```
 *
 * @param props - Component props {@link CardProps}
 * @returns React element
 */

const Card = <T extends HTMLTag>({
  as,
  skin = "bordered",
  selected = false,
  disabled = false,
  interaction,
  variation = "vertical",
  spacing = "m",
  fullHeight,
  children,
  className,
  borderRadius = spacing,
  ...otherProps
}: Readonly<CardProps<T>>): React.ReactElement => {
  const [contextValue, setContextValue] = useState<CardContextValue>({
    image: undefined,
  });

  const contextProps = useMemo(
    () => ({
      setValue: setContextValue,
    }),
    [],
  );

  return (
    <CardContext.Provider value={contextProps}>
      <PolymorphicComponent
        as={as}
        fallback={[
          "div",
          {
            ...otherProps,
          },
        ]}
        commonProps={{
          className: classNames(
            styles.root,
            className,
            styles[skin],
            styles[variation],
            fullHeight && styles.full_height,
            styles[`spacing_${spacing}`],
            styles[`border_radius_${borderRadius}`],
            {
              [`${styles.hoverable}`]:
                !disabled && (interaction === "click" || interaction === "hover"),
              [`${styles.clickable}`]: !disabled && interaction === "click",
              [`${styles.selected}`]: selected,
              [`${styles.disabled}`]: disabled,
            },
          ),
        }}>
        {contextValue.image ? (
          <img
            {...contextValue.image}
            alt={contextValue.image.alt}
            className={classNames(styles.image, contextValue.image.className)}
          />
        ) : null}
        <div className={styles.content}>{children}</div>
      </PolymorphicComponent>
    </CardContext.Provider>
  );
};

Card.Image = CardImage;

export { Card, type CardProps };
