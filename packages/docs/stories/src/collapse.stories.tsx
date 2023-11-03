import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@rck/theme";
import { faker } from "@faker-js/faker";
import { Collapse, Text } from "@rck/all/src";

const meta: Meta<typeof Collapse> = {
  title: "Components/Collapse",
  component: Collapse,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Collapse>;

export const Default: Story = {
  parameters: {
    layout: "padded",
  },
  args: {
    header: <Text type="h2">{faker.lorem.sentence()}</Text>,
    children: <Text>{faker.lorem.sentence()}</Text>,
  },
};
