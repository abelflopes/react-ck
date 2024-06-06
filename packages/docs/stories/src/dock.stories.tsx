import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Dock } from "@react-ck/provisional/src";
import { Icon } from "@react-ck/icon/src";
import { faker } from "@faker-js/faker";
import { IconBell } from "@react-ck/icon/icons/IconBell";
import { IconCog } from "@react-ck/icon/icons/IconCog";
import { IconFolder } from "@react-ck/icon/icons/IconFolder";
import { IconHome } from "@react-ck/icon/icons/IconHome";
import { IconUserCircle } from "@react-ck/icon/icons/IconUserCircle";

type Story = StoryObj<typeof Dock>;

const meta: Meta<typeof Dock> = {
  title: "Layout/Dock",
  ...configureStory(Dock, {
    decorators: [
      (Story): React.ReactElement => (
        <Manager>
          <Story />
        </Manager>
      ),
    ],
  }),
};

const header = <Dock.MainItem label={faker.company.name()} image={faker.image.avatar()} />;

const footer = (
  <>
    <Dock.Item icon={<Icon Icon={IconBell} />} label="Notifications" active={false} />
    <Dock.Item icon={<Icon Icon={IconCog} />} label="Settings" active={false} />
    <Dock.Item icon={<Icon Icon={IconUserCircle} />} label="Profile" active={false} />
  </>
);

const children = (
  <>
    <Dock.Item icon={<Icon Icon={IconHome} />} label="Home" active />
    <Dock.Item icon={<Icon Icon={IconFolder} />} label="Projects" active={false} />
  </>
);

export default meta;

export const Collapsed: Story = {
  args: {
    header,
    footer,
    expanded: false,
    children,
  },
};

export const expanded: Story = {
  args: {
    header,
    footer,
    expanded: true,
    children,
  },
};
