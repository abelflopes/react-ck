import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { FileUploader, type FileUploaderProps, Text } from "@react-ck/base-components/src";
import { Icon } from "@react-ck/icon/src";
import { IconAttach } from "@react-ck/icon/icons/IconAttach";

type Story = StoryObj<typeof FileUploader>;

const meta: Meta<typeof FileUploader> = {
  title: "Form/File uploader",
  ...configureStory(FileUploader, {
    parameters: {
      layout: "padded",
    },
    decorators: [
      (Story): React.ReactElement => (
        <Manager>
          <Story />
        </Manager>
      ),
    ],
  }),
};

const args: FileUploaderProps = {
  children: (
    <>
      Drag & drop files{" "}
      <Text as="span" skin="highlight-primary">
        here
      </Text>
    </>
  ),
  description: "Maximum upload files size: 120MB",
  onProgress: (...data) => {
    // eslint-disable-next-line no-console -- // TODO: remove once fully implemented
    console.log("Progress", data);
  },

  onChange: (_, filesList) => {
    void (async (): Promise<void> => {
      // eslint-disable-next-line no-console -- // TODO: remove once fully implemented
      console.log("Change", await filesList);
    })();
  },
  inputProps: {
    accept: ".pdf,.jpb,.png,video/*",
    multiple: true,
  },
};

export default meta;

export const Default: Story = {
  args,
};

export const Disabled: Story = {
  args: {
    ...args,
    tabIndex: -1,
    skin: "disabled",
    inputProps: {
      ...args.inputProps,
      disabled: true,
    },
  },
};

export const Error: Story = {
  args: {
    ...args,
    skin: "negative",
    validationMessage: "Error: file is too big",
  },
};

export const Square: Story = {
  parameters: {
    layout: "centered",
  },
  args: {
    ...args,
    variation: "square",
  },
};

export const AsIconButton: Story = {
  parameters: {
    layout: "centered",
  },
  args: {
    inputProps: args.inputProps,
    buttonProps: {
      skin: "secondary",
    },
    icon: (
      <Icon>
        <IconAttach />
      </Icon>
    ),
  },
};
