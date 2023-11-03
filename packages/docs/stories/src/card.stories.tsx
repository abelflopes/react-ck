import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@rck/theme";
import { faker } from "@faker-js/faker";
import { Card, Text } from "@rck/all/src";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: <Text>{faker.lorem.sentence()}</Text>,
  },
};
