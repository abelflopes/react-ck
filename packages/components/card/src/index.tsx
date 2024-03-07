import classNames from "classnames";
import styles from "./styles/index.module.scss";
import React, { useMemo, useState } from "react";
import { CardContext, type CardContextValue } from "./context";
import { CardImage } from "./CardImage";

/**
 * Props for the Card component
 */
interface CardProps extends Readonly<React.HTMLAttributes<HTMLDivElement>> {
  /** Defines card style */
  skin?: "bordered" | "shadowed" | "ghost";
  /** Defines card orientation */
  variation?: "vertical" | "horizontal";
  /** Controls the amount of spacing between card limits */
  spacing?: "s" | "m" | "l" | "none";
}

/**
 * Card is a content container that represents a single object and related actions.
 * For example, an article or task.
 * @param props - {@link React.HTMLAttributes}
 * @returns a React element
 */

const Card = ({
  skin = "bordered",
  variation = "vertical",
  spacing = "m",
  children,
  className,
  ...otherProps
}: Readonly<CardProps>): React.ReactElement => {
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
      <div
        {...otherProps}
        className={classNames(styles.root, className, styles[skin], styles[variation], {
          [`${styles[`spacing_${spacing}`]}`]: spacing !== "none",
        })}>
        {contextValue.image ? (
          <img
            {...contextValue.image}
            alt={contextValue.image.alt}
            className={classNames(styles.image, contextValue.image.className)}
          />
        ) : null}

        <div className={styles.content}>{children}</div>
      </div>
    </CardContext.Provider>
  );
};

Card.Image = CardImage;

export { Card, type CardProps };
