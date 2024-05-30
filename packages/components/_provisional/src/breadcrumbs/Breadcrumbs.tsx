import React, { useMemo } from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { IconChevronRight, Icon } from "@react-ck/icon";
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
    () => items.flatMap((i, k) => (k === 0 ? i : [<Icon key="_" Icon={IconChevronRight} />, i])),
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
