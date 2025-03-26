import React, { useContext } from "react";
import { DockContext } from "./context";
import { Button, type ButtonProps } from "../button";
import styles from "./styles/dock-item.module.scss";
import classNames from "classnames";
import { Icon, type IconProps } from "@react-ck/icon";

export interface DockItemProps extends Omit<ButtonProps, "children" | "skin" | "icon"> {
  icon: IconProps["children"];
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
      skin={active ? "primary" : "secondary"}
      skinVariation={active ? "muted" : "ghost"}
      title={expanded ? undefined : label}
      icon={<Icon size={expanded ? "m" : "l"}>{icon}</Icon>}
      {...otherProps}>
      {expanded ? label : null}
    </Button>
  );
};
