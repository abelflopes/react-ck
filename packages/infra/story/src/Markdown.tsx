import React, { useMemo } from "react";
import { Markdown as StorybookMarkdown } from "@storybook/blocks";

export interface MarkdownProps {
  children: string;
}

export const Markdown = ({ children }: Readonly<MarkdownProps>): React.ReactElement => {
  const computedContent = useMemo(() => {
    const [filtered] = children.split("<!-- storybook-ignore -->");

    if (!filtered) throw new Error("No content to render");

    return filtered;
  }, [children]);

  return <StorybookMarkdown>{computedContent}</StorybookMarkdown>;
};
