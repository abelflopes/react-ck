import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { configureStory } from "@react-ck/story-config";
import { ThemeProvider } from "@react-ck/theme";
import { Layer, LayersProvider } from "@react-ck/layers";
import { Card } from "@react-ck/card";

type Story = StoryObj<typeof LayersProvider>;

const meta: Meta<typeof LayersProvider> = {
  title: "Providers/layers",
  ...configureStory(LayersProvider, {
    decorators: [
      (Story) => (
        <ThemeProvider>
          <div style={{ height: 150, display: "flex", alignItems: "center" }}>
            <Story />
          </div>
        </ThemeProvider>
      ),
    ],
  }),
};

export default meta;

const style: React.CSSProperties = {
  marginLeft: -25,
};

export const Component: Story = {
  args: {
    children: (
      <>
        <Layer elevation="floating">
          <Card style={style}>Floating</Card>
        </Layer>
        <Layer elevation="popup">
          <Card style={style}>Popup</Card>
        </Layer>
        <Layer elevation="root">
          <Card style={style}>Root</Card>
        </Layer>
        <Layer elevation="sticky">
          <Card style={style}>Sticky</Card>
        </Layer>
        <Layer elevation="overlay">
          <Card style={style}>Overlay</Card>
        </Layer>
      </>
    ),
  },
};
