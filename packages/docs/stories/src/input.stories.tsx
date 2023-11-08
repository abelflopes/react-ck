import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@rck/theme";
import { faker } from "@faker-js/faker";
import { sentenceCase } from "change-case";
import { Input } from "@rck/input/src";

const meta: Meta<typeof Input> = {
  title: "Form Components/Input",
  component: Input,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    required: true,
    placeholder: sentenceCase(faker.lorem.words({ min: 1, max: 2 })),
  },
};
