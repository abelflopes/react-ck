import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { Text, Collapse } from "@react-ck/base-components/src";
import { configureStory } from "@react-ck/story-config";

type Story = StoryObj<typeof Collapse>;

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
