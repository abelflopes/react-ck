import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Dock } from "@react-ck/provisional/src";
import { Bell, Cog, Folder, Home, Icon, UserCircle } from "@react-ck/icon";
import { faker } from "@faker-js/faker";

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
    <Dock.Item icon={<Icon Icon={Bell} />} label="Notifications" active={false} />
    <Dock.Item icon={<Icon Icon={Cog} />} label="Settings" active={false} />
    <Dock.Item icon={<Icon Icon={UserCircle} />} label="Profile" active={false} />
  </>
);

const children = (
  <>
    <Dock.Item icon={<Icon Icon={Home} />} label="Home" active />
    <Dock.Item icon={<Icon Icon={Folder} />} label="Projects" active={false} />
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
