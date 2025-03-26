import React from "react";
import styles from "./styles/item.module.scss";
import classNames from "classnames";
import {
  PolymorphicComponent,
  type ConsumerPolymorphicProps,
  type HTMLTag,
} from "@react-ck/react-utils";

export interface BreadcrumbItemProps<T extends HTMLTag>
  extends React.ButtonHTMLAttributes<HTMLSpanElement>,
    ConsumerPolymorphicProps<T> {
  active?: boolean;
}

export const BreadcrumbItem = <T extends HTMLTag>({
  as,
  active,
  className,
  children,
  ...otherProps
}: Readonly<BreadcrumbItemProps<T>>): React.ReactElement => (
  <PolymorphicComponent
    as={as}
    fallback={["span", otherProps]}
    commonProps={{
      className: classNames(styles.root, active && styles.active, className),
    }}>
    {children}
  </PolymorphicComponent>
);
