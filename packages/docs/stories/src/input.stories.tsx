import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { sentenceCase } from "change-case";
import { configureStory } from "@react-ck/story-config";
import { Input } from "@react-ck/input/src";
import { Normal as FormFieldNormal, Validation as FormFieldValidation } from "./form-field.stories";
import { objectExclude } from "../utils/object-exclude";
import { FormField } from "@react-ck/form-field";

type Story = StoryObj<typeof Input>;

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

export const Normal: Story = {
  args: {
    ...objectExclude(FormFieldNormal.args ?? {}, ["children"]),
    required: true,
    placeholder: sentenceCase(faker.lorem.words({ min: 1, max: 2 })),
  },
};

export const Validation: Story = {
  args: {
    ...objectExclude(FormFieldValidation.args ?? {}, ["children"]),
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
    ...objectExclude(FormFieldValidation.args ?? {}, ["children"]),
    skin: undefined,
    required: true,
    placeholder: faker.internet.email(),
  },
};
