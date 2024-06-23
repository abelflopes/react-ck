import React, { useEffect } from "react";
import { useContextFormContext } from "../context";
import * as RckTextarea from "@react-ck/textarea";

export interface TextareaProps extends RckTextarea.TextareaProps {
  name: string;
}

export const Textarea = ({ onChange, ...props }: Readonly<TextareaProps>): React.ReactElement => {
  const { setValue } = useContextFormContext();

  useEffect(() => {
    setValue(props.name, props.defaultValue || props.value);
  }, [props.defaultValue, props.name, props.value, setValue]);

  return (
    <RckTextarea.Textarea
      {...props}
      onChange={(e) => {
        setValue(props.name, e.target.value);
        onChange?.(e);
      }}
    />
  );
};
