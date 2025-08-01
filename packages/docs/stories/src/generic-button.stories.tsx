import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";
import { sentenceCase } from "change-case";
import { configureStory } from "@react-ck/storybook-utils";
import { Button, type ButtonProps, Manager, Icon } from "react-ck";
import { IconClose } from "@react-ck/icon/icons/IconClose";
import { generateAllVariations } from "./utils/generate-all-variations";

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

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: sentenceCase(faker.lorem.words({ min: 1, max: 3 })),
  },
};

export const Secondary: Story = {
  args: {
    skin: "secondary",
    children: sentenceCase(faker.lorem.words({ min: 1, max: 3 })),
  },
};

export const WithIconBefore: Story = {
  args: {
    ...Default.args,
    iconPosition: "before",
    icon: (
      <Icon>
        <IconClose />
      </Icon>
    ),
  },
};

export const WithIconAfter: Story = {
  args: {
    ...WithIconBefore.args,
    iconPosition: "after",
  },
};

export const IconOnly: Story = {
  args: {
    size: "s",
    skinVariation: "ghost",
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
    ...Default.args,
    disabled: true,
  },
};

export const Block: Story = {
  args: {
    ...Default.args,
    iconPosition: "before",
    size: "block",
    skin: "secondary",
    skinVariation: "muted",
    fullWidth: true,
    icon: (
      <Icon>
        <IconClose />
      </Icon>
    ),
  },
};

export const AllButtonVariations: Story = {
  decorators: [
    (): React.ReactElement =>
      generateAllVariations<ButtonProps>(
        Button,
        {
          children: [sentenceCase(faker.lorem.word()), undefined],
          icon: [
            undefined,
            <Icon>
              <IconClose />
            </Icon>,
          ],
          skin: ["primary", "secondary", "negative"],
          skinVariation: ["default", "bordered", "muted", "ghost"],
          size: ["xl", "l", "m", "s", "xs"],
        },
        {
          colSize: 2,
          align: "centered",
          filter: (props) => Boolean(props.children) || Boolean(props.icon),
        },
      ),
  ],
};
