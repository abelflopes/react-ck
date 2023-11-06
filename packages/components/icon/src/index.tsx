import styles from "./styles/index.module.scss";
/// React
import React from "react";
// Icons
import { type IconType } from "react-icons";
import icons from "./icons";

/* eslint-enable @typescript-eslint/no-unsafe-assignment */
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
  console.log(name, icons[name]);

  const Icon: IconType = icons[name];
  const IconElement = <Icon {...otherProps} title={title} size={16} />;

  const Component = url ? (
    <a href={url} title={title} target="_blank" rel="noreferrer" className={styles.root}>
      {IconElement}
    </a>
  ) : (
    IconElement
  );

  return Component;
};
