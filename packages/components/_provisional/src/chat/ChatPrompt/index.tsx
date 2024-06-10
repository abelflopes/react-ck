// React
import React, { useCallback } from "react";
// Styles
import styles from "./index.module.scss";
// Icons - https://react-icons.github.io/react-icons
import { LuSendHorizonal } from "react-icons/lu";
// Components
import { Button } from "@react-ck/button";
import { Input } from "@react-ck/input";
import { Icon } from "@react-ck/icon";
import classNames from "classnames";

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
        <p className={classNames(status.type === "error" && styles.error)}>{status.description}</p>
      ) : null}
      <form className={styles.root} onSubmit={onSubmit}>
        <Input
          className={styles.field}
          autoComplete="off"
          name="message"
          type="text"
          placeholder={placeholder}
          // eslint-disable-next-line jsx-a11y/no-autofocus - exception for chat
          autoFocus
          required
        />
        <Button
          icon={
            <Icon>
              <LuSendHorizonal />
            </Icon>
          }>
          Send
        </Button>
      </form>
    </>
  );
};
