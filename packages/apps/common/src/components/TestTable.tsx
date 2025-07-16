import React from "react";
import { DataTable, Text } from "react-ck";

export const TestTable = (): React.ReactElement => {
  return (
    <>
      <Text margin="none" variation="h2">
        Multiples
      </Text>

      <DataTable
        skin="bordered"
        data={Object.keys(Array.from(Array(10))).map((key) => ({
          "": (
            <Text margin="none" skin="bold" as="span">
              N{key}
            </Text>
          ),
          ...Object.fromEntries(
            Object.keys(Array.from(Array(100))).map((k) => {
              const n = Number(k) * Number(key);
              return [`N${k}`, n];
            }),
          ),
        }))}
        autoHeaders
        sortable
        scrollable
      />
    </>
  );
};
