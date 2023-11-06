import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@rck/theme";
import { faker } from "@faker-js/faker";
import { List, Text } from "@rck/all/src";

const meta: Meta<typeof List> = {
  title: "Components/List",
  component: List,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof List>;

export const Default: Story = {
  parameters: {
    controls: { exclude: ["items"] },
  },
  args: {
    skin: "bordered",
    items: [
      <Text key="0">{faker.lorem.word()}</Text>,
      <Text key="1">{faker.lorem.words({ min: 2, max: 4 })}</Text>,
      <Text key="2">{faker.lorem.word()}</Text>,
    ],
  },
};
