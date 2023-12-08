import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { sentenceCase } from "change-case";
import { configureStory } from "@react-ck/story-config";
import { Button } from "@react-ck/button/src";
import { defaultTheme } from "@react-ck/theme/src";

type Story = StoryObj<typeof Manager>;

const meta: Meta<typeof Manager> = {
  title: "Core/Manager",
  ...configureStory(Manager, {}),
};

export default meta;

export const component: Story = {
  args: {
    theme: {
      target: document.body,
      theme: defaultTheme,
    },
    children: <Button>{sentenceCase(faker.lorem.words({ min: 1, max: 3 }))}</Button>,
  },
};
