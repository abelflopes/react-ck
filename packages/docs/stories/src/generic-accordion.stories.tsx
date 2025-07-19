import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";
import { Text, Accordion, Manager } from "react-ck";
import { configureStory } from "@react-ck/storybook-utils";

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

type Story = StoryObj<typeof meta>;

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
