import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { configureStory } from "@react-ck/storybook-utils";
import { Spinner, Manager } from "react-ck";

const meta: Meta<typeof Spinner> = {
  title: "Loading/Spinner",
  ...configureStory(Spinner, {
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

export const Component: Story = {
  args: {},
};
