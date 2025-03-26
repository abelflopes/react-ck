import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { configureStory } from "@react-ck/story-config";
import { Text } from "@react-ck/base-components/src";

type Story = StoryObj<typeof Text>;

const meta: Meta<typeof Text> = {
  title: "Generic/Text",
  ...configureStory(Text, {
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
    children: faker.lorem.sentence(),
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
    children: faker.lorem.sentence(),
  },
};

export const Link: Story = {
  args: {
    skin: "link",
    as: <a href="#some-link">{faker.lorem.sentence()}</a>,
  },
};
