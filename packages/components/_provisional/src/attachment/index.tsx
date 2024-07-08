import styles from "./styles/index.module.scss";
import React from "react";
import classNames from "classnames";
import { Button } from "@react-ck/button";
import { Image } from "../image";
import { Icon } from "@react-ck/icon";
import { IconClose } from "@react-ck/icon/icons/IconClose";

export interface AttachmentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  image?: string;
  name: string;
  format: string;
  icon?: React.ReactNode;
  onRemove?: () => void;
  error?: React.ReactNode;
}

export const Attachment = ({
  image,
  name,
  format,
  icon,
  onRemove,
  error,
  className,
  ...otherProps
}: Readonly<AttachmentProps>): React.ReactElement => (
  <div
    {...otherProps}
    className={classNames(
      image ? styles.root_image : styles.root,
      onRemove && styles.removable,
      className,
    )}>
    {image ? <Image alt={name} src={image} className={styles.image} /> : null}

    {icon ? <span className={styles.icon}>{icon}</span> : null}

    {!image && (
      <div className={styles.content}>
        <span>{name}</span>
        <span>{format}</span>
      </div>
    )}

    {error ? <span className={styles.error}>{error}</span> : null}

    {onRemove ? (
      <Button
        className={styles.close}
        size="xs"
        skin="secondary"
        icon={
          <Icon size="m">
            <IconClose />
          </Icon>
        }
        onClick={onRemove}
      />
    ) : null}
  </div>
);
