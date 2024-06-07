import React, { useRef } from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Tooltip } from "@react-ck/provisional/src";
import { Button } from "@react-ck/button";
import { faker } from "@faker-js/faker";

type Story = StoryObj<typeof Tooltip>;

const meta: Meta<typeof Tooltip> = {
  title: "Generic/Tooltip",
  ...configureStory(Tooltip, {
    parameters: {
      source: {
        type: "code",
      },
    },
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
    open: undefined,
    position: undefined,
  },
  render: ({ open, position }): React.ReactElement => {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- exception for storybook
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
      <>
        <Button rootRef={buttonRef}>Button</Button>
        <Tooltip anchor={buttonRef} open={open} position={position}>
          {faker.lorem.sentence(5)}
        </Tooltip>
      </>
    );
  },
};
