import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

export interface BannerProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  children?: never;
}

export const Banner = ({
  className,
  alt,
  ...otherProps
}: Readonly<BannerProps>): React.ReactElement => (
  <img className={classNames(styles.root, className)} alt={alt} {...otherProps} />
);
