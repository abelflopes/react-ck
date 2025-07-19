import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { configureStory } from "@react-ck/storybook-utils";
import { OverlaySpinner, Text, Manager } from "react-ck";
import { faker } from "@faker-js/faker";

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

type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    active: true,
  },
};
