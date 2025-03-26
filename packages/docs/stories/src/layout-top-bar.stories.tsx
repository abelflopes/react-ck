import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Breadcrumbs, TopBar } from "@react-ck/base-components";
import { Button } from "@react-ck/base-components/src";
import { Icon } from "@react-ck/icon/src";
import { IconChevronLeft } from "@react-ck/icon/icons/IconChevronLeft";

type Story = StoryObj<typeof TopBar>;

const meta: Meta<typeof TopBar> = {
  title: "Layout/Top Bar",
  ...configureStory(TopBar, {
    parameters: {
      layout: "padded",
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
    before: (
      <Breadcrumbs
        items={[
          <Button
            key="1"
            skin="secondary"
            as={["a", { href: "/" }]}
            size="s"
            icon={
              <Icon>
                <IconChevronLeft />
              </Icon>
            }>
            Back
          </Button>,
          <Breadcrumbs.Item key="2">Some Company</Breadcrumbs.Item>,
          <Breadcrumbs.Item key="3" active>
            Workspace Name
          </Breadcrumbs.Item>,
        ]}
      />
    ),
    children: "Client environment",
    after: (
      <Button skin="primary" size="s">
        Save Changes
      </Button>
    ),
  },
};
