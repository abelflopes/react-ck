import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Icon } from "@react-ck/icon/src";
import { IconGitHub } from "@react-ck/icon/icons/IconGitHub";
import { IconBellFill } from "@react-ck/icon/icons/IconBellFill";
import { faker } from "@faker-js/faker";

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
    children: <IconBellFill />,
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
    children: <IconGitHub />,
  },
};

export const Unicode: Story = {
  args: {
    children: <>😄</>,
  },
};

export const Image: Story = {
  args: {
    children: <img alt="Icon" src={faker.image.urlPicsumPhotos()} />,
  },
};

export const Svg: Story = {
  args: {
    children: (
      <svg height="100" width="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle r="45" cx="50" cy="50" fill="red" />
      </svg>
    ),
  },
};
