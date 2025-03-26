import React, { useMemo } from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { Icon } from "@react-ck/icon";
import { IconChevronRight } from "@react-ck/icon/icons/IconChevronRight";
import { BreadcrumbItem } from "./BreadcrumbItem";

/**
 * Props for configuring the Breadcrumbs component
 */
interface BreadcrumbsProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  /** Array of React nodes to be displayed as breadcrumb items, separated by chevron icons */
  items: React.ReactNode[];
}

/**
 * Navigation component that shows the current location within a hierarchy
 * Automatically adds chevron icons between items
 */
const Breadcrumbs = ({
  items,
  className,
  ...otherProps
}: Readonly<BreadcrumbsProps>): React.ReactElement => {
  const computedItems = useMemo(
    () =>
      items.flatMap((i, k) =>
        k === 0
          ? i
          : [
              <Icon key="_">
                <IconChevronRight />
              </Icon>,
              i,
            ],
      ),
    [items],
  );

  return (
    <nav className={classNames(styles.root, className)} {...otherProps}>
      {computedItems}
    </nav>
  );
};

Breadcrumbs.Item = BreadcrumbItem;

export { Breadcrumbs, type BreadcrumbsProps };
