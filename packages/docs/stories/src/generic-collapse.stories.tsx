import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { Text } from "@react-ck/text/src";
import { configureStory } from "@react-ck/story-config";
import { Collapse } from "@react-ck/collapse/src";

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
