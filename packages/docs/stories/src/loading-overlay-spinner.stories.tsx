import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { OverlaySpinner, Text } from "@react-ck/base-components/src";
import { faker } from "@faker-js/faker";

type Story = StoryObj<typeof OverlaySpinner>;

const meta: Meta<typeof OverlaySpinner> = {
  title: "Loading/Overlay Spinner",
  ...configureStory(OverlaySpinner, {
    parameters: {
      layout: "padded",
      // FIXME: not working https://storybook.js.org/docs/api/doc-block-source#excludedecorators
      // docs: { source: { type: "auto", excludeDecorators: false } },
    },
    decorators: [
      (Story): React.ReactElement => (
        <Manager>
          <OverlaySpinner.Container>
            <Text>{faker.lorem.paragraphs(5)}</Text>
            <Story />
          </OverlaySpinner.Container>
        </Manager>
      ),
    ],
  }),
};

export default meta;

export const Component: Story = {
  args: {
    active: true,
  },
};
