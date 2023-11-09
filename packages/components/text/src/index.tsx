import styles from "./styles/index.module.scss";
/// React
import React, { type ReactHTML, useMemo } from "react";
// Utils
import classNames from "classnames";
import { useThemeContext } from "@rck/theme";

export type TextVariation = "small" | "bold" | "link" | "link_hidden" | "inverted";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** Adds margin to the text element  */
  margin?: boolean;
  /** Specifies the type/visual variation of text element to be rendered  */
  type?: "huge" | "soft" | keyof Pick<ReactHTML, "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p">;
  /* Specifies the visual style variation(s) for the text */
  variation?: TextVariation | TextVariation[];
  /** Specifies the custom element to be used as the text container  */
  as?: keyof ReactHTML | React.ReactElement;
}

export const Text = ({
  as,
  margin = true,
  type = "p",
  variation,
  className,
  children,
  ...otherProps
}: Readonly<TextProps>): React.ReactElement => {
  const { inverted } = useThemeContext();

  const computedVariations = Array.isArray(variation) ? variation : variation && [variation];

  const computedClassNames = useMemo(
    () =>
      classNames(
        styles.root,
        styles[type],
        {
          [`${styles.margin}`]: margin,
        },
        computedVariations?.filter((index) => index !== "inverted").map((index) => styles[index]),
        {
          [`${styles.inverted}`]: inverted && !computedVariations?.includes("inverted"),
        },
        className,
      ),
    [className, computedVariations, inverted, margin, type],
  );

  const tag = useMemo<keyof ReactHTML>(() => {
    if (typeof as === "string") return as;

    let value: keyof ReactHTML;

    switch (type) {
      case "soft":
      case "huge": {
        value = "h1";
        break;
      }

      default: {
        value = type;
      }
    }

    return value;
  }, [type, as]);

  const element = useMemo<React.ReactElement>(
    () =>
      as && React.isValidElement<HTMLElement>(as)
        ? React.cloneElement(
            as,
            {
              className: classNames(as.props.className, computedClassNames),
            },
            <>
              {as.props.children}
              {children}
            </>,
          )
        : React.createElement(
            tag,
            {
              ...otherProps,
              className: computedClassNames,
            },
            children,
          ),
    [as, computedClassNames, children, tag, otherProps],
  );

  return element;
};
