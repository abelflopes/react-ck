import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { Text } from "@react-ck/text/src";
import { configureStory } from "@react-ck/story-config";
import { Modal } from "@react-ck/modal/src";
import { Button } from "@react-ck/button";

type Story = StoryObj<typeof Modal>;

const meta: Meta<typeof Modal> = {
  title: "Generic/Modal",
  ...configureStory(Modal, {
    parameters: {
      layout: "fullscreen",
    },
    decorators: [
      (Story): React.ReactElement => (
        <Manager>
          <div style={{ height: 350 }}>
            <Story />
          </div>
        </Manager>
      ),
    ],
  }),
};

export default meta;

export const Component: Story = {
  args: {
    children: (
      <>
        <Modal.Header heading={faker.lorem.sentence(4)} />

        <Text>{faker.lorem.sentence(6)}</Text>

        <Modal.Footer>
          <Button>{faker.lorem.word()}</Button>
        </Modal.Footer>
      </>
    ),
  },
};
