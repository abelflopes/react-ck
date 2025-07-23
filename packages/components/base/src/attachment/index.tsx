import styles from "./styles/index.module.scss";
import React from "react";
import classNames from "classnames";
import { Button } from "../button";
import { IconClose } from "@react-ck/icon/icons/IconClose";
import { Icon } from "@react-ck/icon";
import { IconDocument } from "@react-ck/icon/icons/IconDocument";
import { IconAttach } from "@react-ck/icon/icons/IconAttach";
import { IconAudio } from "@react-ck/icon/icons/IconAudio";
import { IconImage } from "@react-ck/icon/icons/IconImage";
import { IconSpreadsheet } from "@react-ck/icon/icons/IconSpreadsheet";
import { Spinner } from "../spinner";

/**
 * Props interface for the Attachment component.
 * Defines options for displaying file attachments.
 */
export interface AttachmentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Size of the attachment container.
   * @default "m"
   */
  size?: "m" | "l" | "s";
  /** Visual style based on file type.
   * @default "default"
   */
  skin?: "default" | "pdf" | "doc" | "audio" | "image" | "spreadsheet";
  /** Whether to expand to container width.
   * @default false
   */
  fullWidth?: boolean;
  /** Display name of the attachment */
  name: string;
  /** File format or extension */
  format: string;
  /** Callback for removing the attachment */
  onRemove?: React.MouseEventHandler<HTMLButtonElement>;
  /** Error message to display below the attachment */
  error?: React.ReactNode;
  /** Whether to show the loading spinner */
  loading?: boolean;
  /** Whether the attachment is selected */
  selected?: boolean;
  /** Whether the attachment is disabled */
  disabled?: boolean;
  /** Whether the attachment is interactive */
  interactive?: boolean;
  /** Actions to display in the attachment */
  actions?: React.ReactNode;
}

const iconMap: { [key in NonNullable<AttachmentProps["skin"]>]: NonNullable<React.ReactNode> } = {
  default: <IconAttach />,
  doc: <IconDocument />,
  pdf: <IconDocument />,
  audio: <IconAudio />,
  image: <IconImage />,
  spreadsheet: <IconSpreadsheet />,
};

const getSkin = (filename: string): NonNullable<AttachmentProps["skin"]> => {
  const extension = filename.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "pdf": {
      return "pdf";
    }
    case "docx":
    case "doc":
    case "txt": {
      return "doc";
    }
    case "mp3":
    case "wav":
    case "ogg":
    case "m4a":
    case "aac":
    case "flac":
    case "wma": {
      return "audio";
    }
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "bmp":
    case "tiff":
    case "ico":
    case "webp": {
      return "image";
    }
    case "xls":
    case "xlsx":
    case "csv": {
      return "spreadsheet";
    }
    default: {
      return "default";
    }
  }
};

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
 *   loading={true}
 * />
 * ```
 *
 * @param props - Component props {@link AttachmentProps}
 * @returns React element
 */
export const Attachment = ({
  size = "m",
  fullWidth,
  name,
  skin = getSkin(name),
  format,
  onRemove,
  error,
  className,
  loading,
  selected,
  disabled,
  interactive,
  actions,
  ...otherProps
}: Readonly<AttachmentProps>): React.ReactElement => (
  <div
    tabIndex={interactive && !disabled ? 0 : undefined}
    {...otherProps}
    className={classNames(
      styles.root,
      fullWidth && styles.full_width,
      styles[`size_${size}`],
      selected && styles.selected,
      disabled && styles.disabled,
      interactive && styles.interactive,
      className,
    )}>
    <span className={classNames(styles.icon, styles[`icon_${skin}`])}>
      <Icon>{iconMap[skin]}</Icon>
      {loading ? (
        <span className={styles.spinner}>
          <Spinner size="l" />
        </span>
      ) : null}
    </span>

    <div className={styles.content}>
      <span className={styles.name} title={name}>
        {name}
      </span>

      {!error && size !== "s" ? <span className={styles.format}>{format}</span> : null}

      {error ? <span className={styles.error}>{error}</span> : null}
    </div>
    {(onRemove || actions) && (
      <div className={styles.actions}>
        {actions}

        {onRemove ? (
          <Button
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
    )}
  </div>
);
