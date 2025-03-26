import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { Text, Accordion } from "@react-ck/base-components/src";
import { configureStory } from "@react-ck/story-config";

type Story = StoryObj<typeof Accordion>;

const meta: Meta<typeof Accordion> = {
  title: "Generic/Accordion",
  ...configureStory(Accordion, {
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
    items: [
      {
        header: <Text skin="bold">{faker.lorem.sentence()}</Text>,
        children: <Text>{faker.lorem.sentence(50)}</Text>,
      },
      {
        header: <Text skin="bold">{faker.lorem.sentence()}</Text>,
        children: <Text>{faker.lorem.sentence(100)}</Text>,
      },
    ],
  },
};
