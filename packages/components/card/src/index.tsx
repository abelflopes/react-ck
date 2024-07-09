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
 * Props for the Card component
 */
interface CardProps<T extends HTMLTag = "div">
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    ConsumerPolymorphicProps<T> {
  /** Defines card style */
  skin?: "bordered" | "shadowed" | "ghost";
  /** Applies interactivity styles  */
  interaction?: "hover" | "click";
  /** Defines card orientation */
  variation?: "vertical" | "horizontal";
  /** Controls the amount of spacing between card limits */
  spacing?: "s" | "m" | "l" | "none";
  /** Try to occupy available height, useful to match size with other cards  */
  fullHeight?: boolean;
}

/**
 * Card is a content container that represents a single object and related actions.
 * For example, an article or task.
 * @param props - {@link React.HTMLAttributes}
 * @returns a React element
 */

const Card = <T extends HTMLTag>({
  as,
  skin = "bordered",
  interaction,
  variation = "vertical",
  spacing = "m",
  fullHeight,
  children,
  className,
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
            {
              [`${styles[`spacing_${spacing}`]}`]: spacing !== "none",
              [`${styles.hoverable}`]: interaction === "click" || interaction === "hover",
              [`${styles.clickable}`]: interaction === "click",
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
