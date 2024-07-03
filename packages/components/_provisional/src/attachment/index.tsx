import styles from "./styles/index.module.scss";
import React from "react";
import classNames from "classnames";
import { Card, type CardProps } from "@react-ck/card";
import { Text } from "@react-ck/text";
import { Button } from "@react-ck/button";

export interface AttachmentProps extends Omit<CardProps, "skin" | "children"> {
  name: string;
  format: string;
  icon?: React.ReactNode;
  onRemove?: () => void;
  error?: React.ReactNode;
}

export const Attachment = ({
  name,
  format,
  icon,
  onRemove,
  error,
  className,
  ...otherProps
}: Readonly<AttachmentProps>): React.ReactElement => (
  <Card {...otherProps} className={classNames(styles.root, className)}>
    {icon}
    <Text>{name}</Text>
    <Text>{format}</Text>
    <Text>{error}</Text>
    <Button size="s" onClick={onRemove}>
      Remove
    </Button>
  </Card>
);
