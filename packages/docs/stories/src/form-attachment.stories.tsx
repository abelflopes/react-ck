import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { configureStory } from "@react-ck/storybook-utils";
import { Attachment, Manager } from "react-ck";

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

type Story = StoryObj<typeof meta>;

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
    onRemove: () => {},
  },
};

export const Image: Story = {
  args: {
    name: "file.jog",
    format: "jpg",
    onRemove: () => {},
  },
};

export const inline: Story = {
  args: {
    size: "s",
    name: "file.mp3",
    format: "pdf",
    error: "Invalid file",
    onRemove: () => {},
    loading: true,
    interactive: true,
  },
};
