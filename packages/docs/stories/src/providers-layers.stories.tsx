import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { configureStory } from "@react-ck/storybook-utils";
import { Card, Layer, LayersProvider, ThemeProvider } from "react-ck";

const meta: Meta<typeof LayersProvider> = {
  title: "Providers/layers",
  ...configureStory(LayersProvider, {
    parameters: {
      layout: "fullscreen",
      docs: {
        story: {
          height: 520,
          inline: false,
        },
      },
    },
    decorators: [
      (Story): React.ReactElement => (
        <ThemeProvider>
          <style>
            {`
            body {
              padding: 40px !important;
            }
            `}
          </style>
          <Story />
        </ThemeProvider>
      ),
    ],
  }),
};

const style: React.CSSProperties = {
  marginTop: -25,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    children: (
      <>
        <Layer elevation="floating" group="floating">
          <Card style={style}>Floating</Card>
        </Layer>

        <Layer elevation="popup" group="popup">
          <Card style={style}>Popup</Card>
        </Layer>

        <Layer elevation="root" group="root">
          <Card>Root</Card>
        </Layer>

        <Layer elevation="sticky" group="sticky">
          <Card style={style}>Sticky</Card>
        </Layer>

        <Layer elevation="overlay" group="overlay">
          <Card style={style}>Overlay</Card>
        </Layer>
      </>
    ),
  },
};
