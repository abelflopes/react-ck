import React, {
  type ComponentPropsWithRef,
  type HTMLInputTypeAttribute,
  useEffect,
  useMemo,
} from "react";
import defaultStyles from "./styles/default.module.scss";
import { useFormFieldContext, type FormFieldContextProps } from "@react-ck/form-field";
import classNames from "classnames";

export interface InputProps extends Omit<ComponentPropsWithRef<"input">, "children"> {
  skin?: FormFieldContextProps["skin"];
}

/**
 * Input is a form element that accepts a single line of text.
 * @param props - {@link InputProps}
 * @returns a React element
 */

export const Input = ({
  skin,
  id,
  className,
  ...props
}: Readonly<InputProps>): React.ReactElement => {
  const formFieldContext = useFormFieldContext();

  const computedSkin = useMemo(
    () => formFieldContext?.skin ?? skin ?? "default",
    [formFieldContext?.skin, skin],
  );

  const computedId = useMemo(() => formFieldContext?.id ?? id, [formFieldContext?.id, id]);

  // Determines if input should render the default styles or not
  const isDefaultStyle = useMemo(() => {
    const specialTypes: HTMLInputTypeAttribute[] = ["checkbox", "radio", "range", "color"];
    return !props.type || !specialTypes.includes(props.type);
  }, [props.type]);

  // Validate usage inside form field
  useEffect(() => {
    // Is not inside form field, skip
    if (formFieldContext === undefined) return;

    // Is inside form field
    if (skin) throw new Error("When using input inside form field, define skin on the form field");
    else if (id) throw new Error("When using input inside form field, define id on the form field");
  }, [formFieldContext, id, skin]);

  return (
    <input
      {...props}
      id={computedId}
      className={classNames(
        isDefaultStyle && [
          defaultStyles.root,
          formFieldContext === undefined && defaultStyles.standalone,
          defaultStyles[`skin_${computedSkin}`],
        ],
        className,
      )}
    />
  );
};
