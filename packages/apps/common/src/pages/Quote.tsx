import React, { useCallback, useEffect, useState } from "react";
import { Button, OverlaySpinner, Text, useForm } from "react-ck";
import { DefaultLayout } from "../components/DefaultLayout";
import * as LoginForm from "../forms/login";
import { getSimulations } from "../services/simulator-api";

export const QuotePage = (): React.ReactElement => {
  const { form, validity, values } = useForm({
    fields: LoginForm.fields,
    validators: LoginForm.validators,
    initialValues: LoginForm.values,
  });

  const [loading, setLoading] = useState(0);
  const [data, setData] = useState<unknown>(undefined);
  const [error, setError] = useState<unknown>(undefined);

  const handleSubmit = useCallback<React.FormEventHandler>(
    async (e): Promise<void> => {
      e.preventDefault();

      if (!validity.valid) return;

      console.log("Submit", values);

      setLoading((v) => v + 1);

      const birthDate = new Date(String(values.birthDate));
      const startDate = new Date(String(values.startDate));

      const { data, error } = await getSimulations({
        smoker: values.smoker === "y",
        nif: Number(values.nif),
        loanValue: Number(values.loanValue),
        loanDurationYears: Number(values.duration),
        interestRate: Number(values.interestRate),
        job: String(values.job),
        birthDate: {
          day: birthDate.getDay() + 1,
          month: birthDate.getMonth() + 1,
          year: birthDate.getFullYear(),
        },
        startDate: {
          day: startDate.getDay() + 1,
          month: startDate.getMonth() + 1,
          year: startDate.getFullYear(),
        },
      });

      setData(data);
      setError(error);

      setLoading((v) => v - 1);

      console.log("data", data);
      console.log("error", error);
    },
    [validity.valid, values],
  );

  return (
    <DefaultLayout>
      <Text variation="h1">Simulação</Text>
      <Text>Preencha o formulário para obter diversas simulações</Text>

      <OverlaySpinner.Container>
        <form onSubmit={handleSubmit}>
          {form}

          <Button>Simular</Button>
        </form>
        <OverlaySpinner active={loading > 0} />
      </OverlaySpinner.Container>

      <Text variation="h2">Data</Text>

      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>

      {error ? (
        <>
          <Text variation="h2">Error</Text>

          <pre>
            <code>{JSON.stringify(error, null, 2)}</code>
          </pre>
        </>
      ) : null}
    </DefaultLayout>
  );
};
