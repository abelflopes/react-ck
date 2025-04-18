import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Checkbox, FormField } from "@react-ck/base-components/src";
import { faker } from "@faker-js/faker";

type Story = StoryObj<typeof Checkbox>;

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

export const Component: Story = {
  args: {},
};

export const Toggle: Story = {
  args: {
    isToggle: true,
  },
};
