import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";
import { sentenceCase } from "change-case";
import { configureStory } from "@react-ck/storybook-utils";
import { Input, type InputProps, FormField, Manager } from "react-ck";
import { generateAllVariations } from "./utils/generate-all-variations";

const meta: Meta<typeof Input> = {
  title: "Form/Input",
  ...configureStory(Input, {
    parameters: {
      layout: "padded",
    },
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

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    required: true,
    placeholder: sentenceCase(faker.lorem.words({ min: 1, max: 2 })),
  },
};

export const Validation: Story = {
  args: {
    skin: "negative",
    required: true,
    placeholder: sentenceCase(faker.lorem.words({ min: 1, max: 2 })),
  },
};

export const WithFormField: Story = {
  decorators: [
    (Story: () => React.ReactElement): React.ReactElement => (
      <FormField
        skin="negative"
        label="Your email"
        description="Insert your company email"
        validationMessage="Required field">
        <Story />
      </FormField>
    ),
  ],
  args: {
    required: true,
    placeholder: faker.internet.email(),
  },
};

export const AllInputVariations: Story = {
  decorators: [
    (): React.ReactElement =>
      generateAllVariations<InputProps>((props) => <Input {...props} />, {
        skin: ["default", "negative", "average", "positive", "muted", "ghost"],
        type: [
          "text",
          "date",
          "email",
          "search",
          "file",
          "number",
          "password",
          "range",
          "radio",
          "checkbox",
          "color",
        ],
        placeholder: ["Some Input"],
      }),
  ],
};

export const Disabled: Story = {
  args: {
    ...Normal.args,
    disabled: true,
  },
};
