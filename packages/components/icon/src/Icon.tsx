import styles from "./styles/index.module.scss";
/// React
import React, { type SVGAttributes } from "react";
// Icons
import { type IconType } from "react-icons";
import { useThemeContext } from "@react-ck/theme";
import classNames from "classnames";

export interface IconProps extends Omit<IconType, "size"> {
  size?: "text" | "m" | "l";
  skin?: "default" | "inverted";
  /** Additional CSS class */
  className?: SVGAttributes<SVGElement>["className"];
  Icon: IconType;
}

/**
 * Icon is a visual symbol that indicates the purpose of an interface element. It’s used to represent ideas, content types, and actions.
 * @param props - {@link IconProps}
 * @returns a React element
 */

export const Icon = ({
  size = "text",
  skin = "default",
  className,
  Icon,
  ...otherProps
}: Readonly<IconProps>): React.ReactElement => {
  const themeContext = useThemeContext();

  return (
    <Icon
      {...otherProps}
      className={classNames(
        styles.root,
        styles[`size_${size}`],
        {
          [`${styles[`skin_${skin}`]}`]: skin !== "inverted",
          [`${styles.skin_inverted}`]: themeContext.inverted || skin === "inverted",
        },
        className,
      )}
    />
  );
};
