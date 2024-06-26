import * as styles from "./index.module.scss";
/// React
import React from "react";

interface ChatLayoutProps {
  footer: React.ReactElement;
  children: React.ReactNode | React.ReactNode[];
}

export const ChatLayout = ({ footer, children }: Readonly<ChatLayoutProps>): React.ReactElement => (
  <div className={styles.root}>
    <div className={styles.content}>
      <div className={styles.list}>{children}</div>
    </div>
    <div className={styles.footer}>{footer}</div>
  </div>
);
