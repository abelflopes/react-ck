import React, { useCallback } from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { Button } from "../button";
import { IconCopy } from "@react-ck/icon/icons/All";

/**
 * Props for configuring the Snippet component
 */
export interface SnippetProps extends React.HTMLAttributes<HTMLElement> {
  variation?: "default" | "inline";
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
  variation = "default",
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
    <code
      className={classNames(className, styles.root, styles[`variation_${variation}`])}
      {...otherProps}>
      {actions || showCopyButton ? (
        <div className={styles.actions}>
          {showCopyButton ? (
            <Button
              aria-label="Copy snippet"
              size={variation === "inline" ? "xs" : "s"}
              skin="secondary"
              skinVariation="muted"
              icon={<IconCopy />}
              onClick={handleCopy}
            />
          ) : null}

          {actions}
        </div>
      ) : null}

      {children}
    </code>
  );
};
