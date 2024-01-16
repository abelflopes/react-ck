import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Form, type FormFieldMap, type FormProps } from "@react-ck/form/src";
import * as LoginForm from "@react-ck/form/fixtures/login";

type Story = StoryObj<typeof Form>;

const meta: Meta<typeof Form> = {
  title: "Form/Form",
  ...configureStory(Form, {
    parameters: {
      layout: "padded",
    },
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

const props: FormProps<typeof LoginForm.fields> = {
  fields: LoginForm.fields,
  validators: LoginForm.validators,
  values: LoginForm.values,
  onChange: () => undefined,
};

export const Component: Story = {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- simplify type handling
  args: props as unknown as FormFieldMap,
};
