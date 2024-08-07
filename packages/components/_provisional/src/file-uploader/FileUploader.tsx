import styles from "./styles/index.module.scss";
import React, { useCallback, useMemo, useRef } from "react";
import classNames from "classnames";
import { Text } from "@react-ck/text";
import { Button, type ButtonProps } from "@react-ck/button";
import { readFileList } from "./utils/read-file";

// TODO: check https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
// TODO: add size limitation: https://stackoverflow.com/questions/5697605/limit-the-size-of-a-file-upload-html-input-element
// TODO: max number of files
// TODO: size display helper
// TODO: util convert url to file https://stackoverflow.com/questions/35940290/how-to-convert-base64-string-to-javascript-file-object-like-as-from-file-input-f
// TODO: util file size description
// TODO: add overlay loader
// TODO: add uploaded files feedback

export interface FileUploaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "onProgress"> {
  skin?: "default" | "negative" | "disabled";
  variation?: "default" | "square";
  icon?: React.ReactNode;
  description?: React.ReactNode;
  inputProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;
  buttonProps?: ButtonProps;
  /** The validation message text */
  validationMessage?: React.ReactNode;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    fileList: ReturnType<typeof readFileList>,
  ) => void;
  onProgress?: Parameters<typeof readFileList>[1];
}

// eslint-disable-next-line complexity -- TODO: fix
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
  ...otherProps
}: Readonly<FileUploaderProps>): React.ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isIconOnly = useMemo(() => Boolean(icon) && !description, [description, icon]);

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
        ref={inputRef}
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
