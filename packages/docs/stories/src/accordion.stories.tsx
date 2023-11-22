import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@react-ck/theme";
import { faker } from "@faker-js/faker";
import { Text } from "@react-ck/text/src";
import { configureStory } from "@react-ck/story-config";
import { Accordion } from "@react-ck/accordion/src";

type Story = StoryObj<typeof Accordion>;

const meta: Meta<typeof Accordion> = {
  title: "Generic/Accordion",
  ...configureStory(Accordion, {
    decorators: [
      (Story) => (
        <ThemeProvider>
          <Story />
        </ThemeProvider>
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
        header: <Text variation="bold">{faker.lorem.sentence()}</Text>,
        children: <Text>{faker.lorem.sentence(50)}</Text>,
      },
      {
        header: <Text variation="bold">{faker.lorem.sentence()}</Text>,
        children: <Text>{faker.lorem.sentence(100)}</Text>,
      },
    ],
  },
};
