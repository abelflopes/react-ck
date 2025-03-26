import React, { useContext } from "react";
import { DockContext } from "./context";
import styles from "./styles/dock-main-item.module.scss";
import classNames from "classnames";

export interface DockMainItemProps extends React.HTMLAttributes<HTMLSpanElement> {
  image: React.ReactNode;
}

export const DockMainItem = ({
  image,
  children,
  className,
  ...otherProps
}: Readonly<DockMainItemProps>): React.ReactElement => {
  const { expanded } = useContext(DockContext);

  return (
    <span
      className={classNames(styles.root, expanded && styles.expanded, className)}
      {...otherProps}>
      <span className={styles.image}>{image}</span>

      {expanded ? children : null}
    </span>
  );
};
