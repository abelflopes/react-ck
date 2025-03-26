import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Chat, EmptyState } from "@react-ck/base-components/src";

type Story = StoryObj<typeof Chat>;

const meta: Meta<typeof Chat> = {
  title: "Chat/Chat",
  ...configureStory(
    Chat,
    {
      decorators: [
        (Story): React.ReactElement => (
          <Manager>
            <Story />
          </Manager>
        ),
      ],
    },
    {
      subComponents: [Chat.Message],
    },
  ),
};

export default meta;

export const Normal: Story = {
  args: {
    placeholder: "Ask me anything...",
    status: {
      type: "loading",
      description: "Someone is writing...",
    },
    onSend: () => undefined,
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
    onSend: () => undefined,
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
    onSend: () => undefined,
    children: <EmptyState>The chat is empty, send the first message</EmptyState>,
  },
};
