import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Icon } from "@react-ck/icon/src";
import { IconGitHub } from "@react-ck/icon/icons/IconGitHub";
import { IconBellFill } from "@react-ck/icon/icons/IconBellFill";

type Story = StoryObj<typeof Icon>;

const meta: Meta<typeof Icon> = {
  title: "Generic/Icon",
  ...configureStory(Icon, {
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

export const Normal: Story = {
  args: {
    Icon: IconBellFill,
  },
};

export const Inverted: Story = {
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
  args: {
    skin: "inverted",
    Icon: IconGitHub,
  },
};
