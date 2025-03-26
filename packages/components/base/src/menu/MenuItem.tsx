import styles from "./styles/menu-item.module.scss";
import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./context";
import {
  PolymorphicComponent,
  type ConsumerPolymorphicProps,
  type HTMLTag,
} from "@react-ck/react-utils";
import { Text } from "../text";

/**
 * Props interface for the MenuItem component.
 * Defines the structure and appearance of individual menu items.
 */
export interface MenuItemProps<T extends HTMLTag = "li">
  extends React.HTMLAttributes<HTMLElement>,
    ConsumerPolymorphicProps<T> {
  /** Visual theme of the menu item.
   * @default "default"
   */
  skin?: "default" | "primary" | "secondary" | "negative";
  /** Layout variation of the menu item.
   * @default "default"
   */
  variation?: "default" | "bordered";
  /** Whether the menu item is disabled.
   * @default false
   */
  disabled?: boolean;
  /** Icon element displayed before the content */
  icon?: React.ReactNode;
  /** Action element displayed after the content */
  action?: React.ReactNode;
  /** Secondary text displayed below the main content */
  description?: React.ReactNode;
}

/**
 * Individual menu item component with support for icons, actions, and descriptions.
 * Adapts to parent Menu's layout direction.
 *
 * @example
 * ```tsx
 * <MenuItem
 *   icon={<Icon />}
 *   action={<Button>Action</Button>}
 *   description="Additional info"
 * >
 *   Menu Item
 * </MenuItem>
 * ```
 *
 * @param props - Component props {@link MenuItemProps}
 * @returns React element
 */
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
