import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";
import { Flex, Manager } from "react-ck";
import { configureStory } from "@react-ck/storybook-utils";

const meta: Meta<typeof Flex> = {
  title: "Layout/Flex",
  ...configureStory(Flex, {
    parameters: {
      layout: "padded",
    },
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
    align: "center",
    justify: "center",
    direction: "row",
    wrap: "wrap",
    children: (
      <>
        <span>{faker.commerce.product()}</span>
        <span>{faker.commerce.product()}</span>
        <span>{faker.commerce.product()}</span>
      </>
    ),
  },
};
