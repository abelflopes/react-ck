import React, { useCallback, useMemo, useRef } from "react";
import { ContextFormContext, type ContextFormContextProps } from "./context";
import { Input } from "./fields/Input";
import { Select } from "@react-ck/select";
import { Textarea } from "@react-ck/textarea";

type Values = Record<string, unknown>;

interface ContextFormProps extends Omit<React.HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  children: React.ReactNode;
  onValuesChange?: (values: Values) => void;
  onSubmit?: (props: { values: Values; e: React.FormEvent<HTMLFormElement> }) => void;
}

const ContextForm = ({
  children,
  onValuesChange,
  onSubmit,
  ...otherProps
}: Readonly<ContextFormProps>): React.ReactElement => {
  const values = useRef<Values>({});

  const setValue = useCallback<ContextFormContextProps["setValue"]>(
    (name, value) => {
      values.current = {
        ...values.current,
        [name]: value,
      };
      onValuesChange?.(values.current);
    },
    [onValuesChange],
  );

  const contextFormContextValue = useMemo<ContextFormContextProps>(
    () => ({
      setValue,
    }),
    [setValue],
  );

  return (
    <ContextFormContext.Provider value={contextFormContextValue}>
      <form
        {...otherProps}
        onSubmit={(e) => {
          onSubmit?.({ values: values.current, e });
        }}>
        {children}
      </form>
    </ContextFormContext.Provider>
  );
};

ContextForm.Input = Input;
ContextForm.Select = Select;
ContextForm.Textarea = Textarea;

export { ContextForm, type ContextFormProps };
