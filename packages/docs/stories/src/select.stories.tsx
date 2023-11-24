import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@react-ck/theme";
import { faker } from "@faker-js/faker";
import { configureStory } from "@react-ck/story-config";
import { Select, SelectOption } from "@react-ck/select/src";

type Story = StoryObj<typeof Select>;

const meta: Meta<typeof Select> = {
  title: "Form/Select",
  ...configureStory(Select, {
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
  args: {
    required: true,
    children: (
      <>
        <SelectOption selected disabled value="">
          Select Value
        </SelectOption>
        <SelectOption>{faker.lorem.word()}</SelectOption>
        <SelectOption>{faker.lorem.word()}</SelectOption>
        <SelectOption>{faker.lorem.word()}</SelectOption>
      </>
    ),
  },
};
