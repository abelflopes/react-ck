import React, { useRef } from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Dropdown } from "@react-ck/provisional/src";
import { Button } from "@react-ck/button";

type Story = StoryObj<typeof Dropdown>;

const meta: Meta<typeof Dropdown> = {
  title: "Generic/Dropdown",
  ...configureStory(Dropdown, {
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
    open: true,
  },
  render: ({ anchorRef: argAnchorRef, ...props }): React.ReactElement => {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- exception for storybook
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
      <>
        <Button rootRef={buttonRef}>Button</Button>
        <Dropdown anchorRef={buttonRef ?? argAnchorRef} {...props}>
          Content Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nulla est, quidem
          enim a molestias accusantium quo officia provident maxime voluptatem, beatae delectus
          aliquid ipsa perferendis accusamus! Eius, laborum quisquam. Eius soluta deserunt
          aspernatur tenetur, laudantium quod corrupti natus facilis est ab esse sunt dolore magni
          cum accusamus nemo. Optio adipisci itaque exercitationem quo nulla, odit eligendi natus
          est cupiditate aperiam nemo, vero explicabo. Non eveniet ipsum, dolores suscipit sit
          deserunt doloribus. Dolorum aspernatur iusto, aliquid officiis illo modi vitae.
          Exercitationem laudantium inventore nemo harum commodi doloribus totam porro aliquam. Quae
          aliquam iusto neque ipsam non? Consequuntur saepe inventore aliquam!
        </Dropdown>
      </>
    );
  },
};
