import React, { useContext } from "react";
import { DockContext } from "./context";
import styles from "./styles/dock-main-item.module.scss";
import classNames from "classnames";
import { Avatar, type AvatarProps } from "../avatar";

export interface DockMainItemProps extends React.HTMLAttributes<HTMLSpanElement> {
  image: AvatarProps["image"];
  label: AvatarProps["name"];
}

export const DockMainItem = ({
  image,
  label,
  className,
  ...otherProps
}: Readonly<DockMainItemProps>): React.ReactElement => {
  const { expanded } = useContext(DockContext);

  return (
    <span
      className={classNames(styles.root, expanded && styles.expanded, className)}
      title={expanded ? undefined : label}
      {...otherProps}>
      <Avatar name={label} image={image} />

      {expanded ? label : null}
    </span>
  );
};
