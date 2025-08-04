import styles from "./styles/index.module.scss";
import React, { useCallback, useMemo, useRef, useEffect } from "react";
import classNames from "classnames";
import { Text } from "../text";
import { Button, type ButtonProps } from "../button";
import { readFileList } from "./utils/read-file";
import { megeRefs } from "@react-ck/react-utils";

// TODO: check https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
// TODO: add size limitation: https://stackoverflow.com/questions/5697605/limit-the-size-of-a-file-upload-html-input-element
// TODO: max number of files
// TODO: size display helper
// TODO: util convert url to file https://stackoverflow.com/questions/35940290/how-to-convert-base64-string-to-javascript-file-object-like-as-from-file-input-f
// TODO: util file size description
// TODO: add overlay loader
// TODO: add uploaded files feedback

/**
 * Props for configuring the FileUploader component
 */
interface FileUploaderProps
  extends Omit<React.ComponentPropsWithRef<"div">, "onChange" | "onProgress" | "type"> {
  /** Visual style of the uploader. Defaults to "default" */
  skin?: "default" | "negative" | "disabled";
  /** Layout variation of the uploader. Defaults to "default" */
  variation?: "default" | "square";
  /** Optional icon to display */
  icon?: React.ReactNode;
  /** Optional description text */
  description?: React.ReactNode;
  /** Props passed to the file input element */
  inputProps?: Omit<React.ComponentPropsWithRef<"input">, "type">;
  /** Props passed to the button element when in icon-only mode */
  buttonProps?: ButtonProps;
  /** Validation message displayed below the uploader */
  validationMessage?: React.ReactNode;
  /** Callback fired when files are selected */
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    fileList: ReturnType<typeof readFileList>,
  ) => void;
  /** Callback fired during file reading progress */
  onProgress?: Parameters<typeof readFileList>[1];
  /** Try topen the file input immediately when the component is mounted */
  openImmediately?: boolean;
}

/**
 * File input component with drag and drop support
 * Supports icon-only and descriptive layouts with validation
 */
export const FileUploader = ({
  skin = "default",
  variation = "default",
  icon,
  description,
  validationMessage,
  className,
  children,
  inputProps,
  buttonProps,
  onChange,
  onProgress,
  openImmediately,
  ...otherProps
}: Readonly<FileUploaderProps>): React.ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isIconOnly = useMemo(() => Boolean(icon) && !description, [description, icon]);

  const isFirstRender = useRef(true);

  const handleKeyUp = useCallback((e: React.KeyboardEvent<HTMLElement>): void => {
    if (e.code === "Enter") inputRef.current?.click();
  }, []);

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      if (!e.target.files) throw new Error("No files added");

      const fileList = readFileList(e.target.files, onProgress);

      onChange?.(e, fileList);

      inputProps?.onChange?.(e);
    },
    [inputProps, onChange, onProgress],
  );

  useEffect(() => {
    if (openImmediately && isFirstRender.current) inputRef.current?.click();
  }, [openImmediately]);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return (
    <div
      {...otherProps}
      className={classNames(
        variation !== "default" && styles[variation],
        skin !== "default" && styles[skin],
        !isIconOnly && styles.root,
        isIconOnly && styles.root_icon_only,
        className,
      )}>
      <input
        {...inputProps}
        ref={megeRefs(inputRef, inputProps?.ref)}
        type="file"
        className={classNames(styles.file, inputProps?.className)}
        onChange={handleChange}
        onKeyUp={(e) => {
          handleKeyUp(e);
          inputProps?.onKeyUp?.(e);
        }}
      />

      {!isIconOnly && icon}

      {children ? <div className={styles.content}>{children}</div> : null}

      {isIconOnly ? (
        <Button
          {...buttonProps}
          icon={icon}
          disabled={skin === "disabled" || buttonProps?.disabled}
          className={classNames(styles.button, buttonProps?.className)}
          onKeyUp={(e) => {
            handleKeyUp(e);
            buttonProps?.onKeyUp?.(e);
          }}
          onClick={(e) => {
            inputRef.current?.click();
            buttonProps?.onClick?.(e);
          }}
        />
      ) : null}

      {description || validationMessage ? (
        <div className={styles.details}>
          {description ? (
            <Text variation="small" skin="soft">
              {description}
            </Text>
          ) : null}
          {validationMessage ? (
            <Text variation="small" className={styles.validation_message}>
              {validationMessage}
            </Text>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export { type FileUploaderProps };
