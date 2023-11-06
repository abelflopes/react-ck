import { Preview } from "@storybook/react";

const preview: Preview = {
  argTypes: {
    children: {
      description: "Content Slot",
      control: false,
    },
    header: {
      control: false,
    },
  },
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#fff",
        },
        {
          name: "medium",
          value: "#808080",
        },
        {
          name: "dark",
          value: "#000",
        },
      ],
    },
    docs: {
      canvas: {
        sourceState: "shown",
      },
    },
    layout: "centered",
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      sort: "requiredFirst",
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
