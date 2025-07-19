import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { configureStory } from "@react-ck/storybook-utils";
import { Checkbox, FormField, Manager } from "react-ck";
import { faker } from "@faker-js/faker";

const meta: Meta<typeof Checkbox> = {
  title: "Form/Checkbox",
  ...configureStory(Checkbox, {
    decorators: [
      (Story): React.ReactElement => (
        <Manager>
          <FormField
            skin="negative"
            variation="inline"
            label={faker.lorem.sentence()}
            description={faker.lorem.sentence()}
            validationMessage={faker.lorem.sentence()}>
            <Story />
          </FormField>
        </Manager>
      ),
    ],
  }),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {},
};

export const Toggle: Story = {
  args: {
    ...Component.args,
    isToggle: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Component.args,
    disabled: true,
  },
};
