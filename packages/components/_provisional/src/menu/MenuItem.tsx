import styles from "./styles/menu-item.module.scss";
import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./context";
import {
  PolymorphicComponent,
  type ConsumerPolymorphicProps,
  type HTMLTag,
} from "@react-ck/react-utils";
import { Text } from "@react-ck/text";

export interface MenuItemProps<T extends HTMLTag = "li">
  extends React.HTMLAttributes<HTMLElement>,
    ConsumerPolymorphicProps<T> {
  skin?: "default" | "primary" | "secondary" | "negative";
  variation?: "default" | "bordered";
  disabled?: boolean;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  description?: React.ReactNode;
}

export const MenuItem = <T extends HTMLTag>({
  as,
  skin = "default",
  variation = "default",
  icon,
  disabled,
  className,
  children,
  action,
  description,
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
          skin !== "default" && styles[`skin_${skin}`],
          variation !== "default" && styles[`variation_${variation}`],
          disabled && styles.disabled,
          styles[menuContext.variation],
          className,
        ),
      }}>
      {icon}

      <div className={styles.content}>
        {children}

        {description ? (
          <Text skin={skin === "negative" ? "negative" : "soft"} variation="extra-small">
            {description}
          </Text>
        ) : null}
      </div>

      {action ? <span className={styles.action}>{action}</span> : null}
    </PolymorphicComponent>
  );
};
