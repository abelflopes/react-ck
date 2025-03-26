import React, { useContext } from "react";
import { DockContext } from "./context";
import { Button, type ButtonProps } from "../button";
import styles from "./styles/dock-item.module.scss";
import classNames from "classnames";
import { Icon, type IconProps } from "@react-ck/icon";

/**
 * Props for configuring a DockItem component
 */
export interface DockItemProps extends Omit<ButtonProps, "children" | "skin" | "icon"> {
  /** Icon component to display */
  icon: IconProps["children"];
  /** Text label shown when dock is expanded */
  label: string;
  /** Whether this item is currently active */
  active: boolean;
}

/**
 * Navigation item for the Dock component
 * Adapts to dock's expanded state to show/hide label
 */
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
