import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { Image } from "../image";

/**
 * Props for configuring the Avatar component
 */
export interface AvatarProps extends React.HTMLAttributes<HTMLElement> {
  /** Display name used to generate initials when no image is provided */
  name: string;
  /** Optional URL of the avatar image */
  image?: string;
  /** Size of the avatar. Defaults to "m" */
  size?: "s" | "m" | "l";
  /** Visual style of the avatar's shape. Defaults to "rounded" */
  skin?: "square" | "rounded";
}

/**
 * Displays a user avatar with either an image or initials
 * Generates initials from the first and last word of the name when no image is provided
 */
export const Avatar = ({
  name,
  image,
  size = "m",
  className,
  skin = "rounded",
  ...otherProps
}: Readonly<AvatarProps>): React.ReactElement => {
  const initials = name
    .split(" ")
    .map((i) => i[0])
    .filter((_, k, arr) => k === 0 || k === arr.length - 1)
    .join("")
    .toUpperCase();

  return (
    <figure
      className={classNames(styles.root, styles[`size_${size}`], styles[`skin_${skin}`], className)}
      {...otherProps}>
      {!image && <figcaption>{initials}</figcaption>}
      {image ? <Image alt={name} src={image} className={styles.image} /> : null}
    </figure>
  );
};
