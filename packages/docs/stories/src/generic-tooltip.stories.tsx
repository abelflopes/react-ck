import React, { useRef } from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { configureStory } from "@react-ck/storybook-utils";
import { Tooltip, Button, Manager } from "react-ck";
import { faker } from "@faker-js/faker";

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
        <Manager usePortal={false}>
          <Story />
        </Manager>
      ),
    ],
  }),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    open: undefined,
    position: "top-center",
  },
  render: ({ open, position }): React.ReactElement => {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- exception for storybook
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
      <>
        <Button rootRef={buttonRef}>Hover me</Button>
        <Tooltip anchor={buttonRef} open={open} position={position}>
          {faker.lorem.sentence(5)}
        </Tooltip>
      </>
    );
  },
};
