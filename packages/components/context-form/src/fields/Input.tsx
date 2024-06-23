import React, { useEffect } from "react";
import { useContextFormContext } from "../context";
import * as RckInput from "@react-ck/input";

export interface InputProps extends RckInput.InputProps {
  name: string;
}

export const Input = ({ onChange, ...props }: Readonly<InputProps>): React.ReactElement => {
  const { setValue } = useContextFormContext();

  useEffect(() => {
    setValue(props.name, props.defaultValue || props.value);
  }, [props.defaultValue, props.name, props.value, setValue]);

  return (
    <RckInput.Input
      {...props}
      onChange={(e) => {
        setValue(props.name, e.target.value);
        onChange?.(e);
      }}
    />
  );
};
