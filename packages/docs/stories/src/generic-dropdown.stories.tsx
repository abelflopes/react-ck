import React, { useState } from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { configureStory } from "@react-ck/storybook-utils";
import { Dropdown, DropdownButton, Button, Flex, Manager, Icon } from "react-ck";
import { IconVerticalDots } from "@react-ck/icon/icons/IconVerticalDots";

const meta: Meta<typeof Dropdown> = {
  title: "Generic/Dropdown",
  ...configureStory(Dropdown, {
    parameters: {
      source: {
        type: "code",
      },
    },
    subcomponents: { DropdownButton },
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
    open: false,
  },
  render: ({ ...props }): React.ReactElement => (
    <Flex>
      <DropdownButton
        open={props.open}
        renderButton={({ ref, open }) => (
          <Button rootRef={ref} onClick={open}>
            Dropdown 1
          </Button>
        )}>
        Content Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nulla est, quidem
        enim a molestias accusantium quo officia provident maxime voluptatem, beatae delectus
        aliquid ipsa perferendis accusamus! Eius, laborum quisquam. Eius soluta deserunt aspernatur
        tenetur, laudantium quod corrupti natus facilis est ab esse sunt dolore magni cum accusamus
        nemo. Optio adipisci itaque exercitationem quo nulla, odit eligendi natus est cupiditate
        aperiam nemo, vero explicabo. Non eveniet ipsum, dolores suscipit sit deserunt doloribus.
        Dolorum aspernatur iusto, aliquid officiis illo modi vitae. Exercitationem laudantium
        inventore nemo harum commodi doloribus totam porro aliquam. Quae aliquam iusto neque ipsam
        non? Consequuntur saepe inventore aliquam!
      </DropdownButton>

      <DropdownButton
        renderButton={({ ref, open }) => (
          <Button rootRef={ref} onClick={open}>
            Button 2
          </Button>
        )}>
        Content Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nulla est, quidem
        enim a molestias accusantium quo officia provident maxime voluptatem, beatae delectus
        aliquid ipsa perferendis accusamus! Eius, laborum quisquam. Eius soluta deserunt aspernatur
        tenetur, laudantium quod corrupti natus facilis est ab esse sunt dolore magni cum accusamus
        nemo. Optio adipisci itaque exercitationem quo nulla, odit eligendi natus est cupiditate
        aperiam nemo, vero explicabo. Non eveniet ipsum, dolores suscipit sit deserunt doloribus.
        Dolorum aspernatur iusto, aliquid officiis illo modi vitae. Exercitationem laudantium
        inventore nemo harum commodi doloribus totam porro aliquam. Quae aliquam iusto neque ipsam
        non? Consequuntur saepe inventore aliquam!
      </DropdownButton>
    </Flex>
  ),
};

export const ExternalState: Story = {
  args: {
    open: false,
  },
  render: ({ ...props }): React.ReactElement => {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- this is a story
    const [open, setOpen] = useState(props.open);

    return (
      <DropdownButton
        open={open}
        renderButton={({ ref, open }) => (
          <Button rootRef={ref} onClick={open}>
            Dropdown 1
          </Button>
        )}
        onOpenChange={setOpen}>
        Content Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nulla est, quidem
        enim a molestias accusantium quo officia provident maxime voluptatem, beatae delectus
        aliquid ipsa perferendis accusamus! Eius, laborum quisquam. Eius soluta deserunt aspernatur
        tenetur, laudantium quod corrupti natus facilis est ab esse sunt dolore magni cum accusamus
        nemo. Optio adipisci itaque exercitationem quo nulla, odit eligendi natus est cupiditate
        aperiam nemo, vero explicabo. Non eveniet ipsum, dolores suscipit sit deserunt doloribus.
        Dolorum aspernatur iusto, aliquid officiis illo modi vitae. Exercitationem laudantium
        inventore nemo harum commodi doloribus totam porro aliquam. Quae aliquam iusto neque ipsam
        non? Consequuntur saepe inventore aliquam!
        <Button
          skin="negative"
          skinVariation="ghost"
          onClick={() => {
            setOpen(false);
          }}>
          close
        </Button>
      </DropdownButton>
    );
  },
};

export const IconButton: Story = {
  render: ({ ...props }): React.ReactElement => (
    <Flex>
      <DropdownButton
        open={props.open}
        renderButton={({ ref, open }) => (
          <Button
            rootRef={ref}
            skin="secondary"
            skinVariation="ghost"
            icon={
              <Icon>
                <IconVerticalDots />
              </Icon>
            }
            onClick={open}
          />
        )}>
        Content Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nulla est, quidem
        enim a molestias accusantium quo officia provident maxime voluptatem, beatae delectus
        aliquid ipsa perferendis accusamus! Eius, laborum quisquam. Eius soluta deserunt aspernatur
        tenetur, laudantium quod corrupti natus facilis est ab esse sunt dolore magni cum accusamus
        nemo. Optio adipisci itaque exercitationem quo nulla, odit eligendi natus est cupiditate
        aperiam nemo, vero explicabo. Non eveniet ipsum, dolores suscipit sit deserunt doloribus.
        Dolorum aspernatur iusto, aliquid officiis illo modi vitae. Exercitationem laudantium
        inventore nemo harum commodi doloribus totam porro aliquam. Quae aliquam iusto neque ipsam
        non? Consequuntur saepe inventore aliquam!
      </DropdownButton>
      <DropdownButton
        open={props.open}
        renderButton={({ ref, open }) => (
          <Button
            rootRef={ref}
            skin="secondary"
            skinVariation="ghost"
            icon={
              <Icon>
                <IconVerticalDots />
              </Icon>
            }
            onClick={open}
          />
        )}>
        Content Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nulla est, quidem
        enim a molestias accusantium quo officia provident maxime voluptatem, beatae delectus
        aliquid ipsa perferendis accusamus! Eius, laborum quisquam. Eius soluta deserunt aspernatur
        tenetur, laudantium quod corrupti natus facilis est ab esse sunt dolore magni cum accusamus
        nemo. Optio adipisci itaque exercitationem quo nulla, odit eligendi natus est cupiditate
        aperiam nemo, vero explicabo. Non eveniet ipsum, dolores suscipit sit deserunt doloribus.
        Dolorum aspernatur iusto, aliquid officiis illo modi vitae. Exercitationem laudantium
        inventore nemo harum commodi doloribus totam porro aliquam. Quae aliquam iusto neque ipsam
        non? Consequuntur saepe inventore aliquam!
      </DropdownButton>
    </Flex>
  ),
};
