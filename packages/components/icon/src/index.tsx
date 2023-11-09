import styles from "./styles/index.module.scss";
/// React
import React from "react";
// Icons
import { type IconType } from "react-icons";
import icons from "./icons";

export interface IconProps extends Omit<IconType, "size"> {
  /** Specifies the name of the icon to be rendered */
  name: keyof typeof icons;
}

export const Icon = ({ name, ...otherProps }: Readonly<IconProps>): React.ReactElement => {
  const Icon: IconType = icons[name];

  return <Icon {...otherProps} size={16} className={styles.root} />;
};
