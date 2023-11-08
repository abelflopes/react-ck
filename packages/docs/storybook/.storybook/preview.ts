import { Preview } from "@storybook/react";
import { defaultTheme } from "@rck/theme/src";
import { withPerformance } from "storybook-addon-performance";

export const decorators = [withPerformance];

const preview: Preview = {
  argTypes: {
    children: {
      description: "Content Slot",
      control: false,
      if: { arg: "children", truthy: true },
    },
  },
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: defaultTheme.color["neutral-0"],
        },
        {
          name: "medium",
          value: "#808080",
        },
        {
          name: "dark",
          value: defaultTheme.color["neutral-900"],
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
