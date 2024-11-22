import styles from "./styles/index.module.scss";
import React from "react";
import classNames from "classnames";
import { Button } from "@react-ck/button";
import { IconClose } from "@react-ck/icon/icons/IconClose";
import { Icon } from "@react-ck/icon";
import { IconDocument } from "@react-ck/icon/icons/IconDocument";
import { IconAttach } from "@react-ck/icon/icons/IconAttach";

export interface AttachmentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  size?: "m" | "l";
  skin?: "default" | "pdf" | "doc";
  fullWidth?: boolean;
  name: string;
  format: string;
  onRemove?: () => void;
  error?: React.ReactNode;
}

export const Attachment = ({
  size = "m",
  skin = "default",
  fullWidth,
  name,
  format,
  onRemove,
  error,
  className,
  ...otherProps
}: Readonly<AttachmentProps>): React.ReactElement => (
  <div
    {...otherProps}
    className={classNames(
      styles.root,
      onRemove && styles.removable,
      fullWidth && styles.full_width,
      styles[`size_${size}`],
      className,
    )}>
    <span className={classNames(styles.icon, styles[`icon_${skin}`])}>
      <Icon>
        {skin === "default" && <IconAttach />}
        {skin === "doc" && <IconDocument />}
        {skin === "pdf" && <IconDocument />}
      </Icon>
    </span>

    <div className={styles.content}>
      <span>{name}</span>
      <span className={styles.format}>{format}</span>
    </div>

    {error ? <span className={styles.error}>{error}</span> : null}

    {onRemove ? (
      <Button
        className={styles.close}
        size="xs"
        skin="secondary"
        skinVariation="ghost"
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
