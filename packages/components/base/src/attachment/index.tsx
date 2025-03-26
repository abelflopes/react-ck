import styles from "./styles/index.module.scss";
import React from "react";
import classNames from "classnames";
import { Button } from "../button";
import { IconClose } from "@react-ck/icon/icons/IconClose";
import { Icon } from "@react-ck/icon";
import { IconDocument } from "@react-ck/icon/icons/IconDocument";
import { IconAttach } from "@react-ck/icon/icons/IconAttach";

/**
 * Props interface for the Attachment component.
 * Defines options for displaying file attachments.
 */
export interface AttachmentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Size of the attachment container.
   * @default "m"
   */
  size?: "m" | "l";
  /** Visual style based on file type.
   * @default "default"
   */
  skin?: "default" | "pdf" | "doc";
  /** Whether to expand to container width.
   * @default false
   */
  fullWidth?: boolean;
  /** Display name of the attachment */
  name: string;
  /** File format or extension */
  format: string;
  /** Callback for removing the attachment */
  onRemove?: () => void;
  /** Error message to display below the attachment */
  error?: React.ReactNode;
}

/**
 * Component for displaying file attachments with type-specific icons.
 * Supports removal, error states, and different file types.
 *
 * @example
 * ```tsx
 * <Attachment
 *   name="document.pdf"
 *   format="PDF"
 *   skin="pdf"
 *   onRemove={() => handleRemove()}
 * />
 * ```
 *
 * @param props - Component props {@link AttachmentProps}
 * @returns React element
 */
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
      <span className={styles.name} title={name}>
        {name}
      </span>
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
