import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@rck/theme";
import { faker } from "@faker-js/faker";
import { Container, Text } from "@rck/all/src/index";
import { themes } from "@storybook/theming";

const meta: Meta<typeof Container> = {
  title: "Components/Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    spacingX: true,
    spacingY: true,
    variation: "big",
    children: <Text>{faker.lorem.sentence({ min: 50, max: 200 })}</Text>,
  },
};
