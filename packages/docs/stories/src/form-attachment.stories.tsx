import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager/src";
import { configureStory } from "@react-ck/story-config";
import { Attachment } from "@react-ck/base-components/src";

type Story = StoryObj<typeof Attachment>;

const meta: Meta<typeof Attachment> = {
  title: "Form/Attachment",
  ...configureStory(Attachment, {
    decorators: [
      (Story): React.ReactElement => (
        <Manager>
          <Story />
        </Manager>
      ),
    ],
  }),
};

export default meta;

export const Default: Story = {
  args: {
    name: "file.pdf",
    format: "pdf",
  },
};

export const WithError: Story = {
  args: {
    name: "file.pdf",
    format: "pdf",
    error: "Invalid file",
    skin: "doc",
    onRemove: () => undefined,
  },
};

export const Image: Story = {
  args: {
    name: "file.jog",
    format: "jpg",
    onRemove: () => undefined,
  },
};

export const inline: Story = {
  args: {
    size: "s",
    name: "file.mp3",
    format: "pdf",
    error: "Invalid file",
    onRemove: () => undefined,
    loading: true,
    interactive: true,
  },
};
