import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@react-ck/theme";
import { faker } from "@faker-js/faker";
import { sentenceCase } from "change-case";
import { configureStory } from "@react-ck/story-config";
import readme from "@react-ck/button/README.md";
import { Button } from "@react-ck/button/src";

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  title: "Generic/Button",
  ...configureStory(
    Button,
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

export const Primary: Story = {
  args: {
    skin: "primary",
    children: sentenceCase(faker.lorem.words({ min: 1, max: 3 })),
  },
};

export const Secondary: Story = {
  args: {
    skin: "secondary",
    children: sentenceCase(faker.lorem.words({ min: 1, max: 3 })),
  },
};
