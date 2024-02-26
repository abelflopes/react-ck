import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { Image } from "../image";

export interface AvatarProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
  image?: string;
  size?: "s" | "m" | "l";
}

export const Avatar = ({
  name,
  image,
  size = "m",
  className,
  ...otherProps
}: Readonly<AvatarProps>): React.ReactElement => {
  const initials = name
    .split(" ")
    .map((i) => i[0])
    .filter((_, k, arr) => k === 0 || k === arr.length - 1)
    .join("")
    .toUpperCase();

  return (
    <figure className={classNames(styles.root, styles[`size_${size}`], className)} {...otherProps}>
      {!image && <figcaption>{initials}</figcaption>}
      {image ? <Image alt={name} src={image} className={styles.image} /> : null}
    </figure>
  );
};
