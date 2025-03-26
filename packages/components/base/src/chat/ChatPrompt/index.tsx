import React, { useCallback } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";
import { Button } from "../../button";
import { Input } from "../../input";
import { Icon } from "@react-ck/icon";
import { IconLightning } from "@react-ck/icon/icons/IconLightning";
import { IconAttach } from "@react-ck/icon/icons/IconAttach";
import { IconDocument } from "@react-ck/icon/icons/IconDocument";
import { IconArrowRightCircle } from "@react-ck/icon/icons/IconArrowRightCircle";

export interface ChatPromptProps {
  placeholder: string;
  onSend: (message: string) => void;
  status?: {
    type: "error" | "loading";
    description: string;
  };
}

export const ChatPrompt = ({
  placeholder,
  onSend,
  status,
}: Readonly<ChatPromptProps>): React.ReactElement => {
  const onSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const message = formData.get("message");

      if (typeof message === "string") onSend(message);

      event.currentTarget.reset();
    },
    [onSend],
  );

  return (
    <>
      {status ? (
        <p className={classNames(styles.description, status.type === "error" && styles.error)}>
          {status.description}
        </p>
      ) : null}
      <form className={styles.root} onSubmit={onSubmit}>
        <Icon size="m">
          <IconLightning />
        </Icon>
        <Input
          className={styles.field}
          autoComplete="off"
          name="message"
          type="text"
          skin="ghost"
          placeholder={placeholder}
          // eslint-disable-next-line jsx-a11y/no-autofocus -- Exception case
          autoFocus
          required
        />
        <div>
          <Button
            size="s"
            skin="secondary"
            skinVariation="ghost"
            icon={
              <Icon>
                <IconDocument />
              </Icon>
            }
          />
          <Button
            size="s"
            skin="secondary"
            skinVariation="ghost"
            icon={
              <Icon>
                <IconAttach />
              </Icon>
            }
          />
          <Button
            size="s"
            skin="secondary"
            skinVariation="ghost"
            icon={
              <Icon>
                <IconArrowRightCircle />
              </Icon>
            }
          />
        </div>
      </form>
    </>
  );
};
