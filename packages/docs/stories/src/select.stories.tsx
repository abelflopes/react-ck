import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { configureStory } from "@react-ck/story-config";
import { Select, SelectOption } from "@react-ck/select/src";
import { Normal as FormFieldNormal, Validation as FormFieldValidation } from "./form-field.stories";
import { objectExclude } from "../utils/object-exclude";

type Story = StoryObj<typeof Select>;

const meta: Meta<typeof Select> = {
  title: "Form/Select",
  ...configureStory(Select, {
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
    children: (
      <>
        <SelectOption value="" selected disabled>
          Select Value
        </SelectOption>

        <SelectOption>{faker.lorem.word()}</SelectOption>

        <SelectOption>{faker.lorem.word()}</SelectOption>

        <SelectOption>{faker.lorem.word()}</SelectOption>
      </>
    ),
  },
};

export const Validation: Story = {
  args: {
    ...objectExclude(FormFieldValidation.args ?? {}, ["children"]),
    required: true,
    children: (
      <>
        <SelectOption value="" selected disabled>
          Select Value
        </SelectOption>

        <SelectOption>{faker.lorem.word()}</SelectOption>

        <SelectOption>{faker.lorem.word()}</SelectOption>

        <SelectOption>{faker.lorem.word()}</SelectOption>
      </>
    ),
  },
};
