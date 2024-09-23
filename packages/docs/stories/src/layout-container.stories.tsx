import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { Text } from "@react-ck/text/src";
import { configureStory } from "@react-ck/story-config";
import { Container } from "@react-ck/container/src";

type Story = StoryObj<typeof Container>;

const meta: Meta<typeof Container> = {
  title: "Layout/Container",
  ...configureStory(Container, {
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
    children: <Text>{faker.lorem.sentence({ min: 50, max: 200 })}</Text>,
  },
};
