import styles from "./styles/index.module.scss";
import React from "react";
import { useThemeContext } from "@react-ck/theme";
import classNames from "classnames";

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: "text" | "m" | "l";
  skin?: "default" | "inverted";
  children: NonNullable<React.ReactNode>;
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
  children,
  ...otherProps
}: Readonly<IconProps>): React.ReactElement => {
  const themeContext = useThemeContext();

  return (
    <span
      {...otherProps}
      className={classNames(
        styles.root,
        styles[`size_${size}`],
        {
          [`${styles[`skin_${skin}`]}`]: skin !== "inverted",
          [`${styles.skin_inverted}`]: themeContext.inverted || skin === "inverted",
        },
        className,
      )}>
      {children}
    </span>
  );
};
