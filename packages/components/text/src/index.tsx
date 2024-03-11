import styles from "./styles/index.module.scss";
/// React
import React, { type ReactHTML, useMemo } from "react";
// Utils
import classNames from "classnames";
import { useThemeContext } from "@react-ck/theme";
import {
  type ConsumerPolymorphicProps,
  type HTMLTag,
  PolymorphicComponent,
  type BaseHTMLProps,
} from "@react-ck/react-utils";

export type TextVariation = "smallest" | "small" | "bold" | "link" | "link_hidden" | "inverted";

export interface TextProps<T extends HTMLTag> extends BaseHTMLProps, ConsumerPolymorphicProps<T> {
  /** Adds margin to the text element  */
  margin?: boolean;
  /** Specifies the type/visual variation of text element to be rendered  */
  type?: "banner" | "soft" | keyof Pick<ReactHTML, "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p">;
  /* Specifies the visual style variation(s) for the text */
  variation?: TextVariation | TextVariation[];
}

/**
 * Text is a style component that renders a string of characters, words,
 * or paragraphs in a consistent font size and weight.
 * @param props - {@link TextProps}
 * @returns a React element
 */

export const Text = <T extends HTMLTag>({
  as,
  margin = true,
  type = "p",
  variation,
  className,
  children,
  ...otherProps
}: Readonly<TextProps<T>>): React.ReactElement => {
  const theme = useThemeContext();

  const computedVariations = useMemo(
    () => (Array.isArray(variation) ? variation : variation && [variation]),
    [variation],
  );

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
          [`${styles.inverted}`]: computedVariations?.includes("inverted") ?? theme.inverted,
        },
        className,
      ),
    [className, computedVariations, theme, margin, type],
  );

  const defaultTag = useMemo<keyof ReactHTML>(() => {
    let value: keyof ReactHTML | undefined = undefined;

    switch (type) {
      case "soft":
      case "banner": {
        value = "h1";
        break;
      }
      default: {
        value = type;
      }
    }

    return value;
  }, [type]);

  return (
    <PolymorphicComponent
      as={as}
      fallback={defaultTag}
      commonProps={{
        className: computedClassNames,
        children,
        ...otherProps,
      }}
    />
  );
};
