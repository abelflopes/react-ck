import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";
import { Text, Container, Manager } from "react-ck";
import { configureStory } from "@react-ck/storybook-utils";

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

type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    children: <Text>{faker.lorem.sentence({ min: 50, max: 200 })}</Text>,
  },
};
