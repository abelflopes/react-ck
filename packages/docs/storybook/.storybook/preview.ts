import { Preview, Decorator } from "@storybook/react";
import { defaultTheme } from "@react-ck/theme/src";
import { withPerformance } from "storybook-addon-performance";

export const decorators: Decorator[] = [withPerformance];

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
  parameters: {
    options: {
      storySort: {
        order: [
          "Welcome",
          "About",
          "Providers",
          "Generic",
          ["*", "DataTable", "Table"],
          "Form",
          "*",
          "Layout",
          "Utility",
          "Test",
        ],
      },
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: defaultTheme.color["neutral-light-100"],
        },
        {
          name: "medium",
          value: defaultTheme.color["neutral-dark-100"],
        },
        {
          name: "dark",
          value: defaultTheme.color["neutral-dark-500"],
        },
      ],
    },
    docs: {
      canvas: {
        sourceState: "shown",
      },
    },
    layout: "centered",
    // actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      sort: "requiredFirst",
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // https://storybook.js.org/addons/@storybook/addon-a11y
    a11y: {
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
};

export default preview;
