import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { configureStory } from "@react-ck/storybook-utils";
import { Image, Manager, Icon } from "react-ck";
import { IconGitHub } from "@react-ck/icon/icons/IconGitHub";
import { IconNotification } from "@react-ck/icon/icons/IconNotification";
import { faker } from "@faker-js/faker";

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

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    children: <IconNotification />,
  },
};

export const Inverted: Story = {
  globals: {
    backgrounds: { value: "dark" },
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

export const Picture: Story = {
  args: {
    children: <Image alt="Icon" src={faker.image.urlPicsumPhotos()} />,
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
