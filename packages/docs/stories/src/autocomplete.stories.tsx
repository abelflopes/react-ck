import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { configureStory } from "@react-ck/story-config";
import { Autocomplete } from "@react-ck/autocomplete/src";
import { FormField } from "@react-ck/form-field/src";

type Story = StoryObj<typeof Autocomplete>;

const meta: Meta<typeof Autocomplete> = {
  title: "Form/Autocomplete",
  ...configureStory(Autocomplete, {
    decorators: [
      (Story): React.ReactElement => (
        <Manager>
          <Story />
        </Manager>
      ),
    ],
  }),
};

const children = (
  <>
    <Autocomplete.Option value="" selected disabled>
      Autocomplete Value
    </Autocomplete.Option>

    <Autocomplete.Option>{faker.lorem.word()}</Autocomplete.Option>

    <Autocomplete.Option>{faker.lorem.word()}</Autocomplete.Option>

    <Autocomplete.Option>{faker.lorem.word()}</Autocomplete.Option>
  </>
);

export default meta;

export const Normal: Story = {
  args: {
    children,
    placeholder: faker.lorem.sentence(),
  },
};

export const Validation: Story = {
  args: {
    skin: "negative",
    required: true,
    children,
    placeholder: faker.lorem.sentence(),
  },
};

export const WithFormField: Story = {
  decorators: [
    (Story: () => React.ReactElement): React.ReactElement => (
      <FormField
        skin="negative"
        label="Your preference"
        description="Insert your preferred value"
        validationMessage="Required field">
        <Story />
      </FormField>
    ),
  ],
  args: {
    required: true,
    children,
    placeholder: faker.lorem.sentence(),
  },
};
