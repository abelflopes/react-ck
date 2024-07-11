import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { sentenceCase } from "change-case";
import { configureStory } from "@react-ck/story-config";
import { Button } from "@react-ck/button/src";
import { Icon } from "@react-ck/icon/src";
import { IconClose } from "@react-ck/icon/icons/IconClose";

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  title: "Generic/Button",
  ...configureStory(Button, {
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

export const Primary: Story = {
  args: {
    skin: "primary",
    children: sentenceCase(faker.lorem.words({ min: 1, max: 3 })),
  },
};

export const Secondary: Story = {
  args: {
    skin: "secondary",
    children: sentenceCase(faker.lorem.words({ min: 1, max: 3 })),
  },
};

export const IconButton: Story = {
  args: {
    size: "s",
    skin: "ghost",
    icon: (
      <Icon>
        <IconClose />
      </Icon>
    ),
  },
};

export const Link: Story = {
  args: {
    skin: "primary",
    children: sentenceCase(faker.lorem.words({ min: 1, max: 3 })),
    as: ["a", { href: "/" }],
  },
};

export const Disabled: Story = {
  args: {
    ...Primary.args,
    disabled: true,
  },
};
