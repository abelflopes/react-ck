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

export type TextSkin =
  | "default"
  | "bold"
  | "link"
  | "link_hidden"
  | "inverted"
  | "soft"
  | "highlight-primary";

export type TextVariation =
  | "banner"
  | keyof Pick<ReactHTML, "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p">
  | "small"
  | "extra-small"
  | "smallest";

export interface TextProps<T extends HTMLTag> extends BaseHTMLProps, ConsumerPolymorphicProps<T> {
  /** Adds margin to the text element  */
  margin?: "default" | "top" | "bottom" | "both" | "none";
  /** Specifies the type/visual skin of text element to be rendered  */
  variation?: TextVariation;
  /* Specifies the visual style variations for the text */
  skin?: TextSkin | TextSkin[];
}

/**
 * Text is a style component that renders a string of characters, words,
 * or paragraphs in a consistent font size and weight.
 * @param props - {@link TextProps}
 * @returns a React element
 */

export const Text = <T extends HTMLTag>({
  as,
  margin = "default",
  variation = "p",
  skin = "default",
  className,
  children,
  ...otherProps
}: Readonly<TextProps<T>>): React.ReactElement => {
  const theme = useThemeContext();

  const computedSkins = useMemo(() => (Array.isArray(skin) ? skin : skin && [skin]), [skin]);

  const computedClassNames = useMemo(
    () =>
      classNames(
        styles.root,
        styles[`variation_${variation}`],
        computedSkins.filter((skin) => skin !== "inverted").map((skin) => styles[`skin_${skin}`]),
        {
          [`${styles[`margin_${margin}`]}`]: margin !== "default",
          [`${styles.skin_inverted}`]: computedSkins.includes("inverted") || theme.inverted,
        },
        className,
      ),
    [variation, margin, computedSkins, theme.inverted, className],
  );

  const defaultTag = useMemo<keyof ReactHTML>(() => {
    let value: keyof ReactHTML | undefined = undefined;

    switch (variation) {
      case "banner":
        value = "h1";
        break;
      case "small":
      case "extra-small":
      case "smallest":
        value = "p";
        break;
      default:
        value = variation;
    }

    return value;
  }, [variation]);

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
