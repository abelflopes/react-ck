import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Form } from "./Form";
import type { FormValues, FormValidity, FormValidators, FormFieldMap } from "./types";

export interface UseFormProps<T extends FormFieldMap> {
  fields: T;
  initialValues: FormValues<T>;
  validators?: FormValidators<T>;
}

export interface UseFormData<T extends FormFieldMap> {
  form: React.ReactElement;
  initialValues: FormValues<T>;
  values: FormValues<T>;
  setValues: (values: FormValues<T>) => void;
  validity: FormValidity<T>;
}

export const useForm = <T extends FormFieldMap>({
  fields,
  initialValues,
  validators,
}: UseFormProps<T>): UseFormData<T> => {
  // Manually memorize in case initial values are passed directly in the hook to prevent infinite renders
  const [memorizedInitialValues, setMemorizedInitialValues] =
    useState<FormValues<T>>(initialValues);

  const [internalValues, setInternalValues] = useState<FormValues<T>>(memorizedInitialValues);
  const [validity, setValidity] = useState<FormValidity<T>>({
    valid: false,
    fields: {},
  });

  const form = useMemo<React.ReactElement>(
    () => (
      <Form
        fields={fields}
        values={internalValues}
        validators={validators}
        onValidityChange={setValidity}
        onChange={(v) => {
          if (JSON.stringify(v) === JSON.stringify(internalValues)) return;
          setInternalValues(v);
        }}
      />
    ),
    [fields, internalValues, validators],
  );

  const setValues = useCallback<UseFormData<T>["setValues"]>((v) => {
    setInternalValues(v);
  }, []);

  useEffect(() => {
    if (JSON.stringify(initialValues) === JSON.stringify(memorizedInitialValues)) return;
    setMemorizedInitialValues(initialValues);
  }, [initialValues, memorizedInitialValues]);

  return {
    form,
    initialValues: memorizedInitialValues,
    values: internalValues,
    setValues,
    validity,
  };
};
