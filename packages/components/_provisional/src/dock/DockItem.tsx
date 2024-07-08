import React, { useContext } from "react";
import { DockContext } from "./context";
import { Button, type ButtonProps } from "@react-ck/button";
import styles from "./styles/dock-item.module.scss";
import classNames from "classnames";

export interface DockItemProps extends Omit<ButtonProps, "children" | "skin" | "icon"> {
  icon: NonNullable<React.ReactNode>;
  label: string;
  active: boolean;
}

export const DockItem = ({
  icon,
  label,
  active,
  className,
  ...otherProps
}: Readonly<DockItemProps>): React.ReactElement => {
  const { expanded } = useContext(DockContext);

  return (
    <Button
      className={classNames(styles.root, expanded && styles.expanded, className)}
      size={expanded ? "m" : "l"}
      skin={active ? "primary-alt" : "ghost"}
      title={expanded ? undefined : label}
      icon={icon}
      {...otherProps}>
      {expanded ? label : null}
    </Button>
  );
};
