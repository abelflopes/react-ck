import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";
import { configureStory } from "@react-ck/storybook-utils";
import { Chip, Manager, Icon } from "react-ck";
import { IconClose } from "@react-ck/icon/icons/IconClose";

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

type Story = StoryObj<typeof meta>;

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
