import React, { useMemo } from "react";
import { Markdown as StorybookMarkdown } from "@storybook/addon-docs/blocks";

export interface MarkdownProps {
  children: string;
}

export const Markdown = ({ children }: Readonly<MarkdownProps>): React.ReactElement => {
  const computedContent = useMemo(() => {
    const [filtered] = children.split("<!-- storybook-ignore -->");

    if (!filtered) throw new Error("No content to render");

    return filtered;
  }, [children]);

  return (
    <div className="custom-markdown">
      <StorybookMarkdown>{computedContent}</StorybookMarkdown>
    </div>
  );
};
