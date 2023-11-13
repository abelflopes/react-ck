import styles from "./styles/index.module.scss";
/// React
import React from "react";
// Icons
import { type IconType } from "react-icons";
import icons from "./icons";
import { useThemeContext } from "@react-ck/theme";
import classNames from "classnames";

export interface IconProps extends Omit<IconType, "size"> {
  skin?: "default" | "inverted";
  /** Specifies the name of the icon to be rendered */
  name: keyof typeof icons;
}

export const Icon = ({
  skin = "default",
  name,
  ...otherProps
}: Readonly<IconProps>): React.ReactElement => {
  const themeContext = useThemeContext();

  const Icon: IconType = icons[name];

  return (
    <Icon
      {...otherProps}
      size={16}
      className={classNames(styles.root, {
        [`${styles[skin]}`]: skin !== "default" && skin !== "inverted",
        [`${styles.inverted}`]: themeContext.inverted || skin === "inverted",
      })}
    />
  );
};
