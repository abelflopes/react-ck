import styles from "./styles/index.module.scss";
/// React
import React, { type ReactHTML, useMemo } from "react";
// Utils
import classNames from "classnames";

export type TextVariation = "small" | "bold" | "link" | "link_hidden";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  margin?: boolean;
  type?: "huge" | keyof Pick<ReactHTML, "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p">;
  variation?: TextVariation | TextVariation[];
  children?: React.ReactNode | React.ReactNode[];
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
  const computedVariations = Array.isArray(variation) ? variation : variation && [variation];

  const computedClassNames = useMemo(
    () =>
      classNames(
        styles.root,
        styles[type],
        {
          [`${styles.margin}`]: margin,
        },
        computedVariations?.map((i) => styles[i]),
        className,
      ),
    [className, computedVariations, margin, type],
  );

  const tag = useMemo<keyof ReactHTML>(() => {
    if (typeof as === "string") return as;

    let value: keyof ReactHTML;

    switch (type) {
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
