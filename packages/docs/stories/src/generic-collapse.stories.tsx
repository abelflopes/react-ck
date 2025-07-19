import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";
import { Text, Collapse, Manager } from "react-ck";
import { configureStory } from "@react-ck/storybook-utils";

const meta: Meta<typeof Collapse> = {
  title: "Generic/Collapse",
  ...configureStory(Collapse, {
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
  parameters: {
    layout: "padded",
  },
  args: {
    header: (
      <Text skin="bold" margin="none">
        {faker.lorem.sentence()}
      </Text>
    ),
    children: <Text margin="none">{faker.lorem.sentence()}</Text>,
  },
};
