import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@rck/theme";
import { faker } from "@faker-js/faker";
import { sentenceCase } from "change-case";
import { Button } from "@rck/button/src";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: sentenceCase(faker.lorem.words({ min: 1, max: 3 })),
  },
};

export const Secondary: Story = {
  args: {
    skin: "secondary",
    children: sentenceCase(faker.lorem.words({ min: 1, max: 3 })),
  },
};
