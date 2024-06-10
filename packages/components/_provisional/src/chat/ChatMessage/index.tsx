import styles from "./index.module.scss";
/// React
import React, { useRef, useEffect } from "react";
// Utils
import classNames from "classnames";

interface ChatMessageProps {
  senderName: string;
  children: React.ReactNode;
  type: "sent" | "received";
}

export const ChatMessage = ({
  senderName,
  children,
  type,
}: Readonly<ChatMessageProps>): React.ReactElement => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  return (
    <div
      ref={ref}
      className={classNames(styles.root, {
        [`${styles[type]}`]: type,
      })}>
      <div ref={ref} className={styles.sender}>
        {senderName}
      </div>
      <div className={styles.text}>{children}</div>
    </div>
  );
};
