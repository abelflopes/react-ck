import React from "react";
import { ChatLayout } from "./ChatLayout";
import { ChatPrompt, type ChatPromptProps } from "./ChatPrompt";
import { ChatMessage } from "./ChatMessage";

interface ChatProps extends Pick<ChatPromptProps, "status" | "onSend" | "placeholder"> {
  children?: React.ReactNode;
}

const Chat = ({
  status,
  onSend,
  placeholder,
  children,
}: Readonly<ChatProps>): React.ReactElement => (
  <ChatLayout footer={<ChatPrompt status={status} placeholder={placeholder} onSend={onSend} />}>
    {children}
  </ChatLayout>
);

Chat.Message = ChatMessage;

export { Chat, type ChatProps };
