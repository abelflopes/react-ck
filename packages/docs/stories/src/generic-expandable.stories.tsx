/* eslint-disable react-hooks/rules-of-hooks -- exception for storybook */
import React, { useState } from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";
import { Text, Button, Expandable, Flex, Card, Manager } from "react-ck";
import { configureStory } from "@react-ck/storybook-utils";

const meta: Meta<typeof Expandable> = {
  title: "Generic/Expandable",
  ...configureStory(Expandable, {
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

export const Component: Story = {
  parameters: {
    layout: "padded",
  },
  args: {
    expanded: true,
    animateInitial: true,
    children: (
      <Card skin="light">
        <Text margin="none">{faker.lorem.paragraph()}</Text>
      </Card>
    ),
  },
};

export const DynamicExample: Story = {
  parameters: {
    layout: "padded",
  },
  args: {
    expanded: true,
    animateInitial: true,
  },
  render: (props) => {
    const [expanded, setExpanded] = useState(props.expanded);
    const [mounted, setMounted] = useState(true);
    const [showChildren, setShowChildren] = useState(true);
    const [content, setContent] = useState<string[]>([faker.lorem.paragraph()]);

    return (
      <Flex direction="column" align="stretch">
        <Flex justify="start">
          <Button
            skin="secondary"
            skinVariation="muted"
            onClick={() => {
              setExpanded(!expanded);
            }}>
            {expanded ? "Collapse" : "Expand"}
          </Button>
          <Button
            skin="secondary"
            skinVariation="muted"
            onClick={() => {
              setContent((prev) => [...prev, faker.lorem.paragraph()]);
            }}>
            Add Content
          </Button>
          <Button
            skin="secondary"
            skinVariation="muted"
            onClick={() => {
              setContent((prev) => prev.slice(0, -1));
            }}>
            Remove Content
          </Button>
          <Button
            skin="secondary"
            skinVariation="muted"
            onClick={() => {
              setMounted(!mounted);
            }}>
            {mounted ? "Unmount" : "Mount"}
          </Button>
          <Button
            skin="secondary"
            skinVariation="muted"
            onClick={() => {
              setShowChildren(!showChildren);
            }}>
            {showChildren ? "Hide Children" : "Show Children"}
          </Button>
        </Flex>
        {mounted ? (
          <Card skin="light">
            <Expandable expanded={expanded} animateInitial={props.animateInitial}>
              {showChildren
                ? content.map((text, index) => (
                    <Text key={text} margin={index > 0 ? "top" : "none"}>
                      {text}
                    </Text>
                  ))
                : null}
              {showChildren ? props.children : null}
            </Expandable>
          </Card>
        ) : null}
      </Flex>
    );
  },
};
/* eslint-enable */
