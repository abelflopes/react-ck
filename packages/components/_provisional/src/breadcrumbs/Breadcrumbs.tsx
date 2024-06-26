import React, { useMemo } from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { Icon } from "@react-ck/icon";
import { IconChevronRight } from "@react-ck/icon/icons/IconChevronRight";
import { BreadcrumbItem } from "./BreadcrumbItem";

interface BreadcrumbsProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  items: React.ReactNode[];
}

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
