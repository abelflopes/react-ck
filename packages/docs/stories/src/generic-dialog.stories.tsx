import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { Text } from "@react-ck/text/src";
import { configureStory } from "@react-ck/story-config";
import { Dialog } from "@react-ck/provisional/src/dialog";
import { Button } from "@react-ck/button/src";

type Story = StoryObj<typeof Dialog>;

const meta: Meta<typeof Dialog> = {
  title: "Generic/Dialog",
  ...configureStory(Dialog, {
    parameters: {
      layout: "padded",
    },
    decorators: [
      (Story): React.ReactElement => (
        <Manager usePortal={false}>
          <Story />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut sapiente, quia vero eveniet
          perspiciatis dolor optio voluptas vel iste iusto possimus, quaerat quo esse ducimus,
          suscipit veritatis voluptate culpa doloremque quidem tempore. Veniam culpa ipsa, qui
          repudiandae dolore dignissimos ipsum magnam, commodi doloribus ipsam corrupti quaerat.
          Suscipit aliquid tempora, quas numquam eaque cumque non eligendi, laudantium minus quae
          nulla ea natus neque totam? Quae nam, accusantium ad consequatur sequi voluptas. Porro
          aliquid omnis dolore odit eum sequi eveniet ea totam placeat! Quas quia aliquam eligendi!
          Labore repellat rerum, voluptate natus est accusantium facilis accusamus eaque vel, iusto,
          impedit quidem provident!
        </Manager>
      ),
    ],
  }),
};

export default meta;

export const Component: Story = {
  args: {
    heading: faker.lorem.words({ min: 1, max: 2 }),
    children: <Text margin="none">{faker.lorem.paragraphs({ min: 1, max: 2 })}</Text>,
    actions: (
      <>
        <Button skin="secondary" skinVariation="ghost">
          Cancel
        </Button>
        <Button skin="negative">Delete</Button>
      </>
    ),
  },
};
