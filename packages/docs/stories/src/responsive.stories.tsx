import React, { useRef } from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { ResponsiveFragment, useResponsive } from "@react-ck/responsive/src";
import { faker } from "@faker-js/faker";
import { Snippet } from "@react-ck/provisional/src";

type Story = StoryObj<typeof ResponsiveFragment>;

const meta: Meta<typeof ResponsiveFragment> = {
  title: "Utility/Responsive",
  ...configureStory(ResponsiveFragment, {
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
    children: faker.lorem.paragraphs(3),
  },
};

export const useResponsiveHook: Story = {
  render: (): React.ReactElement => {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- exception for storybook
    const ref = useRef<HTMLDivElement>(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks -- exception for storybook
    const responsiveData = useResponsive(ref);

    return (
      <div ref={ref} style={{ width: "66vw", border: "solid 1px cyan" }}>
        <Snippet>{JSON.stringify(responsiveData, null, 2)}</Snippet>
      </div>
    );
  },
};
