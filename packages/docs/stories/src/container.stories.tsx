import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@rck/theme";
import { faker } from "@faker-js/faker";
import { Text } from "@rck/text/src";
import { configureStory } from "@rck/story-config";
import readme from "@rck/container/README.md";
import { Container } from "@rck/container/src";

type Story = StoryObj<typeof Container>;

const meta: Meta<typeof Container> = {
  title: "Layout/Container",
  ...configureStory(
    Container,
    {
      decorators: [
        (Story) => (
          <ThemeProvider>
            <Story />
          </ThemeProvider>
        ),
      ],
    },
    {
      readme,
    },
  ),
};

export default meta;

export const Component: Story = {
  args: {
    spacingX: true,
    spacingY: true,
    variation: "big",
    children: <Text>{faker.lorem.sentence({ min: 50, max: 200 })}</Text>,
  },
};
