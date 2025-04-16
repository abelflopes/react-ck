import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { configureStory } from "@react-ck/story-config";
import { Chip } from "@react-ck/base-components/src";
import { Icon } from "@react-ck/icon/src";
import { IconClose } from "@react-ck/icon/icons/IconClose";

type Story = StoryObj<typeof Chip>;

const meta: Meta<typeof Chip> = {
  title: "Generic/Chip",
  ...configureStory(Chip, {
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

export const Component: Story = {
  args: {
    children: faker.lorem.words({ min: 1, max: 2 }),
  },
};

export const Small: Story = {
  args: {
    ...Component.args,
    size: "s",
  },
};

export const WithIcon: Story = {
  args: {
    ...Component.args,
    icon: (
      <Icon size="text">
        <IconClose />
      </Icon>
    ),
  },
};

export const SmallWithIcon: Story = {
  args: {
    ...WithIcon.args,
    size: "s",
  },
};

export const Clickable: Story = {
  args: {
    ...WithIcon.args,
    interaction: "click",
  },
};
