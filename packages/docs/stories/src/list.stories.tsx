import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@react-ck/theme";
import { faker } from "@faker-js/faker";
import { Text } from "@react-ck/text/src";
import { configureStory } from "@react-ck/story-config";
import readme from "@react-ck/list/README.md";
import { List } from "@react-ck/list/src";

type Story = StoryObj<typeof List>;

const meta: Meta<typeof List> = {
  title: "Generic/List",
  ...configureStory(
    List,
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
