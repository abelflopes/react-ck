import React, { useEffect } from "react";
import { useContextFormContext } from "../context";
import * as RckSelect from "@react-ck/select";

export interface SelectProps extends RckSelect.SelectProps {
  name: string;
}

export const Select = ({ onChange, ...props }: Readonly<SelectProps>): React.ReactElement => {
  const { setValue } = useContextFormContext();

  useEffect(() => {
    setValue(props.name, props.defaultValue || props.value);
  }, [props.defaultValue, props.name, props.value, setValue]);

  return (
    <RckSelect.Select
      {...props}
      onChange={(e) => {
        setValue(props.name, e.target.value);
        onChange?.(e);
      }}
    />
  );
};
