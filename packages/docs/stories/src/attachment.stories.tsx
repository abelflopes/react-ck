import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager/src";
import { configureStory } from "@react-ck/story-config";
import { Attachment } from "@react-ck/provisional/src";
import { Icon } from "@react-ck/icon/src";
import { IconDocument } from "@react-ck/icon/icons/IconDocument";
import { faker } from "@faker-js/faker";

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
    icon: (
      <Icon>
        <IconDocument />
      </Icon>
    ),
  },
};

export const WithError: Story = {
  args: {
    name: "file.pdf",
    format: "pdf",
    icon: (
      <Icon>
        <IconDocument />
      </Icon>
    ),
    error: "Invalid file",
    onRemove: () => undefined,
  },
};

export const Image: Story = {
  args: {
    image: faker.image.urlLoremFlickr(),
    name: "file.jog",
    format: "jpg",
    onRemove: () => undefined,
  },
};
