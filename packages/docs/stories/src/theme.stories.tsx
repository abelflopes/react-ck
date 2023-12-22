import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@react-ck/theme";
import { faker } from "@faker-js/faker";
import { sentenceCase } from "change-case";
import { configureStory } from "@react-ck/story-config";
import { Button } from "@react-ck/button/src";
import { defaultTheme } from "@react-ck/theme/src";

type Story = StoryObj<typeof ThemeProvider>;

const meta: Meta<typeof ThemeProvider> = {
  title: "Providers/Theme",
  ...configureStory(ThemeProvider, {}),
};

export default meta;

// TODO: add basic vs custom example with curtomizable arg tables

export const component: Story = {
  args: {
    target: document.body,
    theme: defaultTheme,
    children: <Button>{sentenceCase(faker.lorem.words({ min: 1, max: 3 }))}</Button>,
  },
};
