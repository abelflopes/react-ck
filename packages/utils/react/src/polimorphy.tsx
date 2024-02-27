import classNames from "classnames";
import React, { type ReactHTML, useMemo } from "react";

const mergeProps = <A extends BaseHTMLProps, B extends BaseHTMLProps>(
  a: A,
  b: B,
): BaseHTMLProps => {
  const { children: childrenA, className: classNameA, ...propsA } = a;
  const { children: childrenB, className: classNameB, ...propsB } = b;

  const errors: string[] = [];

  Object.entries(propsA).forEach(([propA, valueA]) => {
    Object.entries(propsB).forEach(([propB, valueB]) => {
      if (propA === propB) errors.push(`Prop conflict: "${propA}" - ${valueA} / ${valueB}`);
    });
  });

  if (errors.length) throw new Error(errors.join("\n"));

  const res: BaseHTMLProps = {
    ...propsA,
    ...propsB,
    className: classNames(classNameA, classNameB),
    children: [childrenA, childrenB],
  };

  return res;
};

type HTMLTagProps<T extends HTMLTag> = NonNullable<Parameters<ReactHTML[T]>[0]>;

type TagConfig<T extends HTMLTag> = T | [T, HTMLTagProps<T> | undefined];

export type HTMLTag = keyof ReactHTML;

export type BaseHTMLProps = React.HTMLAttributes<HTMLElement>;

export interface ConsumerPolymorphicProps<A extends HTMLTag> {
  /** Specifies the custom element to be used  */
  as?: TagConfig<A> | React.ReactElement;
}

export interface PolymorphicComponentProps<D extends HTMLTag, A extends HTMLTag>
  extends ConsumerPolymorphicProps<A> {
  fallback: TagConfig<D>;
  commonProps: BaseHTMLProps;
  children?: React.ReactNode;
}

export const PolymorphicComponent = <D extends HTMLTag, A extends HTMLTag>({
  fallback,
  as,
  commonProps,
  children,
}: Readonly<PolymorphicComponentProps<D, A>>): React.ReactElement => {
  // Merge children from children slot & props object
  const computedCommonProps = useMemo<typeof commonProps>(
    () => ({
      ...commonProps,
      children: (
        <>
          {commonProps.children}
          {children}
        </>
      ),
    }),
    [children, commonProps],
  );

  const element = useMemo<React.ReactElement>(() => {
    if (typeof as === "string") {
      // Is Simple Tag Override
      return React.createElement(as, computedCommonProps);
    } else if (Array.isArray(as)) {
      // Is Tag Override with props
      return React.createElement(as[0], mergeProps(as[1] ?? {}, computedCommonProps));
    } else if (React.isValidElement<BaseHTMLProps>(as)) {
      // Is React Component
      return React.cloneElement(as, mergeProps(as.props, computedCommonProps));
    } else if (typeof fallback === "string") {
      // Is Simple Default Tag
      return React.createElement(fallback, computedCommonProps);
    }

    // Is Default Tag With PRops
    return React.createElement(fallback[0], mergeProps(fallback[1] ?? {}, computedCommonProps));
  }, [as, computedCommonProps, fallback]);

  return element;
};
