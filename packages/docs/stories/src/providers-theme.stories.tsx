import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";
import { sentenceCase } from "change-case";
import { configureStory } from "@react-ck/storybook-utils";
import { Button, ThemeProvider, defaultTheme } from "react-ck";

const meta: Meta<typeof ThemeProvider> = {
  title: "Providers/Theme",
  ...configureStory(ThemeProvider, {}),
};

export default meta;

type Story = StoryObj<typeof meta>;

// TODO: add basic vs custom example with curtomizable arg tables

export const component: Story = {
  args: {
    target: document.body,
    theme: defaultTheme,
    children: <Button>{sentenceCase(faker.lorem.words({ min: 1, max: 3 }))}</Button>,
  },
};
