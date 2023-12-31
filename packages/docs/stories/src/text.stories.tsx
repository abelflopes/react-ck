import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { configureStory } from "@react-ck/story-config";
import { Text } from "@react-ck/text/src";

type Story = StoryObj<typeof Text>;

const meta: Meta<typeof Text> = {
  title: "Core/Text",
  ...configureStory(Text, {
    decorators: [
      (Story) => (
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
    variation: "inverted",
    children: faker.lorem.sentence(),
  },
};

export const Link: Story = {
  args: {
    variation: "link",
    as: <a href="#some-link">{faker.lorem.sentence()}</a>,
  },
};
