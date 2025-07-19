import type { Preview } from "@storybook/react-vite";
import { defaultTheme } from "@react-ck/theme/src";

const preview: Preview = {
  argTypes: {
    children: {
      description: "Content Slot",
      // control: false,
      control: "text",
      if: { arg: "children", truthy: true },
    },
    icon: {
      control: "text",
      if: { arg: "icon", truthy: true },
    },
    header: {
      control: "text",
      if: { arg: "header", truthy: true },
    },
  },
  initialGlobals: {
    backgrounds: { value: "light" },
  },
  parameters: {
    options: {
      storySort: {
        order: [
          "Welcome",
          "Changelog",
          "Roadmap",
          "Providers",
          "Generic",
          ["*", "DataTable", "Table"],
          "Form",
          "Layout",
          "*",
          "Utility",
          "Test",
        ],
      },
    },
    backgrounds: {
      options: {
        light: {
          name: "light",
          value: defaultTheme.color["neutral-light-100"],
        },
        medium: {
          name: "medium",
          value: defaultTheme.color["neutral-dark-100"],
        },
        dark: {
          name: "dark",
          value: defaultTheme.color["neutral-dark-500"],
        },
        primary: {
          name: "primary",
          value: defaultTheme.color["highlight-primary"],
        },
      },
    },
    docs: {
      canvas: {
        sourceState: "shown",
      },
    },
    layout: "centered",
    controls: {
      sort: "requiredFirst",
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // https://storybook.js.org/addons/@storybook/addon-a11y
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
      options: {
        // https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter-examples
        runOnly: {
          type: "tag",
          values: [
            // https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#axe-core-tags
            "wcag2a",
            "wcag2aa",
            "wcag2aaa",
            "wcag21a",
            "wcag21aa",
            "wcag21aaa",
            "wcag22aa",
            "best-practice",
            "wcag***",
            "ACT",
          ],
        },
      },
    },
  },
  // Enable autodocs for all stories
  tags: ["autodocs"],
};

export default preview;
