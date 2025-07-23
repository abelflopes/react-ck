import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { configureStory } from "@react-ck/storybook-utils";
import { Attachment, Button, Manager } from "react-ck";
import { generateAllVariations } from "./utils/generate-all-variations";

const meta: Meta<typeof Attachment> = {
  title: "Form/Attachment",
  ...configureStory(Attachment, {
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

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "file.pdf",
    format: "pdf",
  },
};

export const LargeWithActions: Story = {
  args: {
    name: "file.pdf",
    format: "pdf",
    skin: "doc",
    size: "l",
    onRemove: () => {},
    actions: (
      <Button size="xs" skinVariation="ghost">
        action
      </Button>
    ),
  },
};

export const WithError: Story = {
  args: {
    name: "file.pdf",
    format: "pdf",
    error: "Invalid file",
    skin: "doc",
    onRemove: () => {},
  },
};

export const Image: Story = {
  args: {
    name: "file.jog",
    format: "jpg",
    onRemove: () => {},
  },
};

export const inline: Story = {
  args: {
    size: "s",
    name: "file.mp3",
    format: "pdf",
    error: "Invalid file",
    onRemove: () => {},
    loading: true,
    interactive: true,
    actions: (
      <Button size="xs" skinVariation="ghost">
        action
      </Button>
    ),
  },
};

export const AllVariations: Story = {
  decorators: [
    (): React.ReactElement => (
      <>
        {generateAllVariations(Attachment, {
          selected: [false, true],
          disabled: [false, true],
          size: ["s", "m", "l"],
          name: ["file"],
          format: ["file"],
          error: [undefined, "Invalid file"],
          onRemove: [undefined, () => {}],
          loading: [true, false],
          interactive: [true, false],

          actions: [
            undefined,
            <Button size="xs" skinVariation="ghost" key={0}>
              action
            </Button>,
          ],
        })}

        {generateAllVariations(Attachment, {
          size: ["s", "m", "l"],
          skin: ["default", "pdf", "doc", "audio", "image", "spreadsheet"],
          name: ["file"],
          format: ["file"],
        })}
      </>
    ),
  ],
};
