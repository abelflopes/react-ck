import styles from "./styles/index.module.scss";
/// React
import React, { useMemo } from "react";
// Utils
import classNames from "classnames";
import { useThemeContext } from "@react-ck/theme";
import {
  type ConsumerPolymorphicProps,
  type HTMLTag,
  PolymorphicComponent,
  type BaseHTMLProps,
} from "@react-ck/react-utils";

/** Visual style variants for text elements */
export type TextSkin =
  | "default"
  | "bold"
  | "link"
  | "link_underline"
  | "link_hidden"
  | "inverted"
  | "soft"
  | "highlight-primary"
  | "negative"
  | "average"
  | "positive"
  | "info";

/** Typography variations defining the semantic level and visual hierarchy */
export type TextVariation =
  | "banner"
  | Extract<HTMLTag, "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p">
  | "small"
  | "extra-small";

/**
 * Props interface for the Text component.
 * Provides typography styling and layout control.
 */
export interface TextProps<T extends HTMLTag> extends BaseHTMLProps, ConsumerPolymorphicProps<T> {
  /** Controls vertical spacing around the text element.
   * @default "default"
   */
  margin?: "default" | "top" | "bottom" | "both" | "none";
  /** Determines the semantic level and visual hierarchy of the text.
   * @default "p"
   */
  variation?: TextVariation;
  /** Applies visual styling to the text. Can be a single style or an array of styles.
   * @default "default"
   */
  skin?: TextSkin | TextSkin[];
}

/**
 * Typography component for rendering text with consistent styling and semantic structure.
 * Supports polymorphic behavior to render as different HTML elements.
 *
 * @example
 * ```tsx
 * <Text variation="h1" skin="bold">Heading</Text>
 * <Text skin={["link", "bold"]}>Bold Link</Text>
 * ```
 *
 * @param props - Component props {@link TextProps}
 * @returns React element
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

  const computedSkins = useMemo(() => (Array.isArray(skin) ? skin : [skin]), [skin]);

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

  const defaultTag = useMemo<HTMLTag>(() => {
    let value: HTMLTag | undefined;

    switch (variation) {
      case "banner": {
        value = "h1";
        break;
      }
      case "small":
      case "extra-small": {
        value = "p";
        break;
      }
      default: {
        value = variation;
      }
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
