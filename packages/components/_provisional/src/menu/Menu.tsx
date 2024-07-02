import styles from "./styles/menu.module.scss";
import classNames from "classnames";
import React, { useMemo } from "react";
import { MenuItem } from "./MenuItem";
import { MenuDivider } from "./MenuDivider";
import { MenuContext, menuContextDefaults, type MenuContextProps } from "./context";

type MenuProps = React.HTMLAttributes<HTMLElement> & MenuContextProps;

// TODO: add a11y https://react.dev/reference/react-dom/createPortal#rendering-a-dock-dialog-with-a-portal
// TODO: keyboard nav / focus

const Menu = ({
  variation = menuContextDefaults.variation,
  children,
  className,
  ...otherProps
}: Readonly<MenuProps>): React.ReactNode => {
  const menuContextValue = useMemo<MenuContextProps>(
    () => ({
      variation,
    }),
    [variation],
  );

  return (
    <MenuContext.Provider value={menuContextValue}>
      <ul className={classNames(styles.root, styles[variation], className)} {...otherProps}>
        {children}
      </ul>
    </MenuContext.Provider>
  );
};

Menu.Item = MenuItem;

Menu.Divider = MenuDivider;

export { Menu, type MenuProps };
