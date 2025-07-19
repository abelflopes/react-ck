import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { configureStory } from "@react-ck/storybook-utils";
import { Chat, EmptyState, Manager } from "react-ck";

const meta: Meta<typeof Chat> = {
  title: "Chat/Chat",
  ...configureStory(Chat, {
    decorators: [
      (Story): React.ReactElement => (
        <Manager>
          <Story />
        </Manager>
      ),
    ],
    subcomponents: { "Chat.Message": Chat.Message },
  }),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    placeholder: "Ask me anything...",
    status: {
      type: "loading",
      description: "Someone is writing...",
    },
    onSend: () => {},
    children: (
      <>
        <Chat.Message senderName="Leslie" type="sent">
          Hello
        </Chat.Message>
        <Chat.Message senderName="Leslie" type="sent">
          How are you?
        </Chat.Message>
        <Chat.Message senderName="Mike" type="received">
          I&apos;m good, thank you.
        </Chat.Message>
      </>
    ),
  },
};

export const Error: Story = {
  args: {
    placeholder: "Ask me anything...",
    status: {
      type: "error",
      description: "The server is not responding. Please try again later.",
    },
    onSend: () => {},
    children: (
      <>
        <Chat.Message senderName="Leslie" type="sent">
          Hello
        </Chat.Message>
        <Chat.Message senderName="Leslie" type="sent">
          How are you?
        </Chat.Message>
        <Chat.Message senderName="Mike" type="received">
          I&apos;m good, thank you.
        </Chat.Message>
      </>
    ),
  },
};

export const Empty: Story = {
  args: {
    placeholder: "Ask me anything...",
    onSend: () => {},
    children: <EmptyState>The chat is empty, send the first message</EmptyState>,
  },
};
