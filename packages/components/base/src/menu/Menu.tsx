import styles from "./styles/menu.module.scss";
import classNames from "classnames";
import React, { useMemo } from "react";
import { MenuItem } from "./MenuItem";
import { MenuDivider } from "./MenuDivider";
import { MenuContext, menuContextDefaults, type MenuContextProps } from "./context";
import {
  PolymorphicComponent,
  type ConsumerPolymorphicProps,
  type HTMLTag,
} from "@react-ck/react-utils";

/**
 * Props interface for the Menu component.
 * Combines HTML attributes, polymorphic behavior, and menu context options.
 */
type MenuProps<T extends HTMLTag = "ul"> = React.HTMLAttributes<HTMLElement> &
  ConsumerPolymorphicProps<T> &
  Partial<MenuContextProps>;

// TODO: add a11y https://react.dev/reference/react-dom/createPortal#rendering-a-dock-dialog-with-a-portal
// TODO: keyboard nav / focus

/**
 * Container component for organizing menu items in a vertical or horizontal layout.
 * Supports polymorphic rendering and provides context for menu items.
 *
 * @example
 * ```tsx
 * <Menu>
 *   <Menu.Item>Option 1</Menu.Item>
 *   <Menu.Divider />
 *   <Menu.Item>Option 2</Menu.Item>
 * </Menu>
 * ```
 *
 * @param props - Component props {@link MenuProps}
 * @returns React element
 */
const Menu = <T extends HTMLTag>({
  as,
  variation = menuContextDefaults.variation,
  children,
  className,
  ...otherProps
}: Readonly<MenuProps<T>>): React.ReactNode => {
  const menuContextValue = useMemo<MenuContextProps>(
    () => ({
      variation,
    }),
    [variation],
  );

  return (
    <MenuContext.Provider value={menuContextValue}>
      <PolymorphicComponent
        as={as}
        fallback={["ul", otherProps]}
        commonProps={{
          className: classNames(styles.root, styles[variation], className),
        }}>
        {children}
      </PolymorphicComponent>
    </MenuContext.Provider>
  );
};

Menu.Item = MenuItem;

Menu.Divider = MenuDivider;

export { Menu, type MenuProps };

export { type MenuItemProps } from "./MenuItem";
export { type MenuDividerProps } from "./MenuDivider";
