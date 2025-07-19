import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";
import { Text, VirtualizedList, Manager } from "react-ck";
import { configureStory } from "@react-ck/storybook-utils";

const meta: Meta<typeof VirtualizedList> = {
  title: "Generic/VirtualizedList",
  ...configureStory(VirtualizedList, {
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

const items = Array.from({ length: 50 }, (_, index) => (
  <Text key={index}>
    {index + 1} - {faker.lorem.sentence(3)}
  </Text>
));

export const Default: Story = {
  parameters: {
    layout: "padded",
  },
  args: {
    items,
    style: {
      maxHeight: 400,
      overflow: "auto",
    },
  },
};
