import React, { useCallback } from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { Flex } from "../flex";
import { Button } from "../button";
import { IconCopy } from "@react-ck/icon/icons/All";

/**
 * Props for configuring the Snippet component
 */
export interface SnippetProps extends React.HTMLAttributes<HTMLElement> {
  /** Custom actions displayed in the top right corner */
  actions?: React.ReactNode;
  /** Whether to show the copy button. Defaults to true */
  showCopyButton?: boolean;
  /** Callback fired after text is copied to clipboard */
  onCopy?: () => void;
}

/**
 * Displays code snippets with copy functionality
 * Supports custom actions and automatic clipboard copying
 */
export const Snippet = ({
  className,
  children,
  actions,
  showCopyButton = true,
  onCopy,
  ...otherProps
}: Readonly<SnippetProps>): React.ReactElement => {
  const handleCopy = useCallback(() => {
    if (typeof children === "string") {
      void navigator.clipboard.writeText(children);
      onCopy?.();
    }
  }, [children, onCopy]);

  return (
    <div className={styles.container}>
      {actions || showCopyButton ? (
        <Flex className={styles.actions} spacing="s">
          {showCopyButton ? (
            <Button
              aria-label="Copy snippet"
              size="s"
              skin="secondary"
              skinVariation="muted"
              icon={<IconCopy />}
              onClick={handleCopy}
            />
          ) : null}

          {actions}
        </Flex>
      ) : null}
      <code className={classNames(className, styles.root)} {...otherProps}>
        {children}
      </code>
    </div>
  );
};
