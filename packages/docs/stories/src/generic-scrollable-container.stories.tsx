import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { ScrollableContainer } from "@react-ck/provisional/src";

type Story = StoryObj<typeof ScrollableContainer>;

const meta: Meta<typeof ScrollableContainer> = {
  title: "Generic/ScrollableContainer",
  ...configureStory(ScrollableContainer, {
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

export const Component: Story = {
  args: {
    style: { height: 100, width: 100 },
    children: (
      <>
        aaaaa
        <div style={{ width: 200, background: "red" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta minus et debitis assumenda
          nesciunt, reiciendis laborum alias, minima cum provident pariatur, delectus est facere
          totam deserunt numquam tempora aliquid eum? Dolores recusandae quibusdam minima quidem,
          blanditiis inventore, qui esse eligendi ipsam temporibus, ipsum non ipsa velit numquam
          corrupti ratione laborum!
        </div>
        bbbb
      </>
    ),
  },
};
