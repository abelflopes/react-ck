import styles from "./styles/index.module.scss";
/// React
import React from "react";
// Icons
import { type IconType } from "react-icons";
import icons from "./icons";

export interface IconProps extends Omit<IconType, "size"> {
  title?: string;
  url?: string;
  name: keyof typeof icons;
}

export const Icon = ({
  name,
  title,
  url,
  ...otherProps
}: Readonly<IconProps>): React.ReactElement => {
  const Icon: IconType = icons[name];
  const IconElement = (<Icon {...otherProps} title={title} size={16} />) as React.ReactElement;

  const Component = url ? (
    <a href={url} title={title} target="_blank" rel="noreferrer" className={styles.root}>
      {IconElement}
    </a>
  ) : (
    IconElement
  );

  return Component;
};
