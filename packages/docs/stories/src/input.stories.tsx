import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { sentenceCase } from "change-case";
import { configureStory } from "@react-ck/story-config";
import { Input } from "@react-ck/input/src";
import { Normal as FormFieldNormal, Validation as FormFieldValidation } from "./form-field.stories";
import { objectExclude } from "../utils/object-exclude";

type Story = StoryObj<typeof Input>;

const meta: Meta<typeof Input> = {
  title: "Form/Input",
  ...configureStory(Input, {
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
