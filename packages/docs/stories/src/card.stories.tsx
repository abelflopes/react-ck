import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@react-ck/theme";
import { faker } from "@faker-js/faker";
import { Text } from "@react-ck/text/src";
import { configureStory } from "@react-ck/story-config";
import readme from "@react-ck/card/README.md";
import { Card } from "@react-ck/card/src";

type Story = StoryObj<typeof Card>;

const meta: Meta<typeof Card> = {
  title: "Generic/Card",
  ...configureStory(
    Card,
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
    children: <Text>{faker.lorem.sentence()}</Text>,
  },
};
