import React, { useMemo } from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { Icon } from "@react-ck/icon";
import { IconChevronRight } from "@react-ck/icon/icons/IconChevronRight";
import { BreadcrumbItem } from "./BreadcrumbItem";
import { DropdownButton } from "../dropdown/DropdownButton";
import { Button } from "../button";
import { IconVerticalDots } from "@react-ck/icon/icons/IconVerticalDots";
import { Menu } from "../menu";
import { BreadcrumsDropdownContextProvider } from "./context/dropdown";

/**
 * Props for configuring the Breadcrumbs component
 */
interface BreadcrumbsProps extends Omit<React.ComponentPropsWithRef<"nav">, "children"> {
  /** Array of React nodes to be displayed as breadcrumb items, separated by chevron icons */
  items: React.ReactNode[];
  /** The number of items to collapse at */
  collapseAt?: number;
}

/**
 * Navigation component that shows the current location within a hierarchy
 * Automatically adds chevron icons between items
 */
const Breadcrumbs = ({
  items,
  className,
  collapseAt = 4,
  ...otherProps
}: Readonly<BreadcrumbsProps>): React.ReactElement => {
  const computedItems = useMemo(() => {
    const shouldCollapse = items.length >= collapseAt;

    const middleItems = items.slice(1, -1);

    const renderItems: Array<React.ReactNode> = [];

    if (shouldCollapse) {
      renderItems.push(
        items[0],
        <DropdownButton
          position="bottom-start"
          renderButton={({ ref, open }) => (
            <Button
              ref={ref}
              onClick={open}
              size="s"
              skin="secondary"
              skinVariation="ghost"
              icon={
                <Icon>
                  <IconVerticalDots />
                </Icon>
              }
            />
          )}>
          <Menu>
            <BreadcrumsDropdownContextProvider>{middleItems}</BreadcrumsDropdownContextProvider>
          </Menu>
        </DropdownButton>,
        items[items.length - 1],
      );
    } else {
      renderItems.push(...items);
    }

    const joinedItems = renderItems.flatMap((i, k) =>
      k === 0
        ? i
        : [
            <Icon key="_">
              <IconChevronRight />
            </Icon>,
            i,
          ],
    );

    return joinedItems;
  }, [items, collapseAt]);

  return (
    <nav className={classNames(styles.root, className)} {...otherProps}>
      {computedItems}
    </nav>
  );
};

Breadcrumbs.Item = BreadcrumbItem;

export { Breadcrumbs, type BreadcrumbsProps };
