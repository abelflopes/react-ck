import styles from "./styles/menu-item.module.scss";
import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./context";
import {
  PolymorphicComponent,
  type ConsumerPolymorphicProps,
  type HTMLTag,
} from "@react-ck/react-utils";

export interface MenuItemProps<T extends HTMLTag = "li">
  extends React.HTMLAttributes<HTMLElement>,
    ConsumerPolymorphicProps<T> {
  skin?: "default" | "primary" | "secondary";
  disabled?: boolean;
  icon?: NonNullable<React.ReactNode>;
}

export const MenuItem = <T extends HTMLTag>({
  as,
  skin = "default",
  icon,
  disabled,
  className,
  children,
  ...otherProps
}: Readonly<MenuItemProps<T>>): React.ReactElement => {
  const menuContext = useContext(MenuContext);

  return (
    <PolymorphicComponent
      as={as}
      fallback={["li", otherProps]}
      commonProps={{
        className: classNames(
          styles.root,
          skin !== "default" && styles[skin],
          disabled && styles.disabled,
          styles[menuContext.variation],
          className,
        ),
      }}>
      {icon}
      {children}
    </PolymorphicComponent>
  );
};
