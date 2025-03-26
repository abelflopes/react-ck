import styles from "./styles/menu.module.scss";
import classNames from "classnames";
import React, { useMemo } from "react";
import { MenuItem, type MenuItemProps } from "./MenuItem";
import { MenuDivider, type MenuDividerProps } from "./MenuDivider";
import { MenuContext, menuContextDefaults, type MenuContextProps } from "./context";
import {
  PolymorphicComponent,
  type ConsumerPolymorphicProps,
  type HTMLTag,
} from "@react-ck/react-utils";

type MenuProps<T extends HTMLTag = "ul"> = React.HTMLAttributes<HTMLElement> &
  ConsumerPolymorphicProps<T> &
  Partial<MenuContextProps>;

// TODO: add a11y https://react.dev/reference/react-dom/createPortal#rendering-a-dock-dialog-with-a-portal
// TODO: keyboard nav / focus

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

export { Menu, type MenuProps, type MenuItemProps, type MenuDividerProps };
