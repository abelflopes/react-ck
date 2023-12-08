import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { sentenceCase } from "change-case";
import { configureStory } from "@react-ck/story-config";
import { Textarea } from "@react-ck/textarea/src";

type Story = StoryObj<typeof Textarea>;

const meta: Meta<typeof Textarea> = {
  title: "Form/Textarea",
  ...configureStory(Textarea, {
    decorators: [
      (Story) => (
        <Manager>
          <Story />
        </Manager>
      ),
    ],
  }),
};

export default meta;

export const Component: Story = {
  args: {
    rows: 5,
    required: true,
    placeholder: sentenceCase(faker.lorem.words({ min: 10, max: 20 })),
  },
};
