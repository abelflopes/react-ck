import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { sentenceCase } from "change-case";
import { configureStory } from "@react-ck/story-config";
import { Textarea } from "@react-ck/textarea/src";
import { FormField } from "@react-ck/form-field/src";

type Story = StoryObj<typeof Textarea>;

const meta: Meta<typeof Textarea> = {
  title: "Form/Textarea",
  ...configureStory(Textarea, {
    decorators: [
      (Story): React.ReactElement => (
        <Manager>
          <Story />
        </Manager>
      ),
    ],
  }),
};

export default meta;

export const Normal: Story = {
  args: {
    rows: 5,
    required: true,
    placeholder: sentenceCase(faker.lorem.words({ min: 10, max: 20 })),
  },
};

export const Validation: Story = {
  args: {
    skin: "negative",
    rows: 5,
    required: true,
    placeholder: sentenceCase(faker.lorem.words({ min: 10, max: 20 })),
  },
};

export const WithFormField: Story = {
  decorators: [
    (Story: () => React.ReactElement): React.ReactElement => (
      <FormField
        skin="negative"
        label="Your address"
        description="Insert your primary address"
        validationMessage="Required field">
        <Story />
      </FormField>
    ),
  ],
  args: {
    rows: 5,
    required: true,
    placeholder: sentenceCase(faker.lorem.words({ min: 10, max: 20 })),
  },
};
