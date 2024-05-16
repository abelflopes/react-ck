import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Dropdown } from "@react-ck/provisional/src";

type Story = StoryObj<typeof Dropdown>;

const meta: Meta<typeof Dropdown> = {
  title: "Generic/Dropdown",
  ...configureStory(Dropdown, {
    decorators: [
      (Story): React.ReactElement => (
        <Manager>
          <Story />
          <div
            style={{
              background: "#fee",
              overflow: "scroll",
              width: "150%",
              height: 200,
              paddingLeft: 200,
              marginLeft: 200,
            }}>
            <Story />
          </div>
        </Manager>
      ),
    ],
  }),
};

export default meta;

export const Component: Story = {
  args: {},
};
