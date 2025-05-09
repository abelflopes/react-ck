import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { sentenceCase } from "change-case";
import { configureStory } from "@react-ck/story-config";
import { Button } from "@react-ck/base-components/src";
import { defaultTheme } from "@react-ck/theme/src";

type Story = StoryObj<typeof Manager>;

const meta: Meta<typeof Manager> = {
  title: "Providers/Manager",
  ...configureStory(Manager, {}),
};

export default meta;

// TODO: add basic vs custom example with curtomizable arg tables

export const component: Story = {
  args: {
    theme: {
      target: document.body,
      theme: defaultTheme,
    },
    children: <Button>{sentenceCase(faker.lorem.words({ min: 1, max: 3 }))}</Button>,
  },
};
