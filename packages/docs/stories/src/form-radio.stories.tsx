import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Radio } from "@react-ck/provisional/src";
import { FormField } from "@react-ck/form-field/src";
import { faker } from "@faker-js/faker";

type Story = StoryObj<typeof Radio>;

const meta: Meta<typeof Radio> = {
  title: "Form/Radio",
  ...configureStory(Radio, {
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
