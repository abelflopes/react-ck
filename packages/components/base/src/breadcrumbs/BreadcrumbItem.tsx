import React, { useMemo } from "react";
import styles from "./styles/item.module.scss";
import classNames from "classnames";
import {
  PolymorphicComponent,
  type ConsumerPolymorphicProps,
  type HTMLTag,
} from "@react-ck/react-utils";
import { useBreadcrumbsDropdownContext } from "./context/dropdown";
import { Menu } from "../menu";
import { Flex } from "../flex";

/**
 * Props for configuring a BreadcrumbItem component
 */
export interface BreadcrumbItemProps<T extends HTMLTag>
  extends React.ButtonHTMLAttributes<HTMLSpanElement>,
    ConsumerPolymorphicProps<T> {
  /** Whether this item represents the current page. Defaults to false */
  active?: boolean;
  /** Whether this item is interactive */
  interactive?: boolean;
}

/**
 * Individual item within a Breadcrumbs component
 * Can be rendered as any HTML element via the `as` prop
 */
export const BreadcrumbItem = <T extends HTMLTag>({
  as,
  active,
  className,
  children,
  interactive,
  ...otherProps
}: Readonly<BreadcrumbItemProps<T>>): React.ReactElement => {
  const breadcrumbsDropdownContext = useBreadcrumbsDropdownContext();

  const isInteractive = useMemo(
    () => interactive ?? !!otherProps.onClick,
    [interactive, otherProps.onClick],
  );

  return breadcrumbsDropdownContext?.isInDropdown ? (
    <Menu.Item as={as} skin={active ? "primary" : "default"} {...otherProps}>
      <Flex spacing="s" justify="start">
        {children}
      </Flex>
    </Menu.Item>
  ) : (
    <PolymorphicComponent
      as={as}
      fallback={["span", otherProps]}
      commonProps={{
        className: classNames(
          styles.root,
          active && styles.active,
          isInteractive && styles.interactive,
          className,
        ),
      }}>
      {children}
    </PolymorphicComponent>
  );
};
