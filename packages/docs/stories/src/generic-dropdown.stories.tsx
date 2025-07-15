import React, { useRef, useState } from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Dropdown, DropdownButton, Button, Flex } from "@react-ck/base-components/src";
import { Icon } from "@react-ck/icon/src";
import { IconVerticalDots } from "@react-ck/icon/icons/IconVerticalDots";

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
        <Manager usePortal={false}>
          <Story />
        </Manager>
      ),
    ],
  }),
};

export default meta;

export const Component: Story = {
  args: {
    open: false,
  },
  render: ({ ...props }): React.ReactElement => {
    return (
      <Flex>
        <DropdownButton
          open={props.open}
          renderButton={({ ref, onOpen }) => (
            <Button rootRef={ref} onClick={onOpen}>
              Dropdown 1
            </Button>
          )}>
          Content Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nulla est, quidem
          enim a molestias accusantium quo officia provident maxime voluptatem, beatae delectus
          aliquid ipsa perferendis accusamus! Eius, laborum quisquam. Eius soluta deserunt
          aspernatur tenetur, laudantium quod corrupti natus facilis est ab esse sunt dolore magni
          cum accusamus nemo. Optio adipisci itaque exercitationem quo nulla, odit eligendi natus
          est cupiditate aperiam nemo, vero explicabo. Non eveniet ipsum, dolores suscipit sit
          deserunt doloribus. Dolorum aspernatur iusto, aliquid officiis illo modi vitae.
          Exercitationem laudantium inventore nemo harum commodi doloribus totam porro aliquam. Quae
          aliquam iusto neque ipsam non? Consequuntur saepe inventore aliquam!
        </DropdownButton>

        <DropdownButton
          renderButton={({ ref, onOpen }) => (
            <Button rootRef={ref} onClick={onOpen}>
              Button 2
            </Button>
          )}>
          Content Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nulla est, quidem
          enim a molestias accusantium quo officia provident maxime voluptatem, beatae delectus
          aliquid ipsa perferendis accusamus! Eius, laborum quisquam. Eius soluta deserunt
          aspernatur tenetur, laudantium quod corrupti natus facilis est ab esse sunt dolore magni
          cum accusamus nemo. Optio adipisci itaque exercitationem quo nulla, odit eligendi natus
          est cupiditate aperiam nemo, vero explicabo. Non eveniet ipsum, dolores suscipit sit
          deserunt doloribus. Dolorum aspernatur iusto, aliquid officiis illo modi vitae.
          Exercitationem laudantium inventore nemo harum commodi doloribus totam porro aliquam. Quae
          aliquam iusto neque ipsam non? Consequuntur saepe inventore aliquam!
        </DropdownButton>
      </Flex>
    );
  },
};

export const IconButton: Story = {
  render: ({ ...props }): React.ReactElement => {
    return (
      <Flex>
        <DropdownButton
          open={props.open}
          renderButton={({ ref, onOpen }) => (
            <Button
              rootRef={ref}
              skin="secondary"
              skinVariation="ghost"
              icon={
                <Icon>
                  <IconVerticalDots />
                </Icon>
              }
              onClick={onOpen}
            />
          )}>
          Content Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nulla est, quidem
          enim a molestias accusantium quo officia provident maxime voluptatem, beatae delectus
          aliquid ipsa perferendis accusamus! Eius, laborum quisquam. Eius soluta deserunt
          aspernatur tenetur, laudantium quod corrupti natus facilis est ab esse sunt dolore magni
          cum accusamus nemo. Optio adipisci itaque exercitationem quo nulla, odit eligendi natus
          est cupiditate aperiam nemo, vero explicabo. Non eveniet ipsum, dolores suscipit sit
          deserunt doloribus. Dolorum aspernatur iusto, aliquid officiis illo modi vitae.
          Exercitationem laudantium inventore nemo harum commodi doloribus totam porro aliquam. Quae
          aliquam iusto neque ipsam non? Consequuntur saepe inventore aliquam!
        </DropdownButton>
        <DropdownButton
          open={props.open}
          renderButton={({ ref, onOpen }) => (
            <Button
              rootRef={ref}
              skin="secondary"
              skinVariation="ghost"
              icon={
                <Icon>
                  <IconVerticalDots />
                </Icon>
              }
              onClick={onOpen}
            />
          )}>
          Content Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nulla est, quidem
          enim a molestias accusantium quo officia provident maxime voluptatem, beatae delectus
          aliquid ipsa perferendis accusamus! Eius, laborum quisquam. Eius soluta deserunt
          aspernatur tenetur, laudantium quod corrupti natus facilis est ab esse sunt dolore magni
          cum accusamus nemo. Optio adipisci itaque exercitationem quo nulla, odit eligendi natus
          est cupiditate aperiam nemo, vero explicabo. Non eveniet ipsum, dolores suscipit sit
          deserunt doloribus. Dolorum aspernatur iusto, aliquid officiis illo modi vitae.
          Exercitationem laudantium inventore nemo harum commodi doloribus totam porro aliquam. Quae
          aliquam iusto neque ipsam non? Consequuntur saepe inventore aliquam!
        </DropdownButton>
      </Flex>
    );
  },
};
