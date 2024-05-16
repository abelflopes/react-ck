/* eslint-disable react/no-multi-comp -- demo page */
import React, { useEffect, useCallback } from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { Snackbar, type SnackbarProps, useSnackbarContext } from "@react-ck/provisional";
import { Alert } from "@react-ck/alert/src";
import { Text } from "@react-ck/text";
import { Button } from "@react-ck/button";
import { Card } from "@react-ck/card";

const MyComponent = (): React.ReactElement => {
  const { add, remove } = useSnackbarContext();

  const handleButtonClick = useCallback(
    () => add(() => <Card skin="shadowed">{faker.lorem.sentences()}</Card>),
    [add],
  );

  useEffect(() => {
    add((id) => (
      <Alert
        key="alert"
        heading={faker.lorem.sentence()}
        dismissable
        onDismiss={() => {
          remove(id);
        }}>
        {faker.lorem.sentences()}
      </Alert>
    ));
  }, [add, remove]);

  return (
    <>
      <Text>{faker.lorem.sentences(20)}</Text>

      <Button onClick={handleButtonClick}>Throw a notification</Button>

      <Text>{faker.lorem.sentences(50)}</Text>
    </>
  );
};

const initialItems: SnackbarProps["initialItems"] = [
  (): React.ReactElement => <Alert skin="positive">Successfully synchronized</Alert>,
];

const App = (): React.ReactElement => (
  <Manager>
    <Snackbar initialItems={initialItems}>
      <MyComponent />
    </Snackbar>
  </Manager>
);

type Story = StoryObj<typeof App>;

const meta: Meta<typeof App> = {
  title: "Layout/Snackbar",
  component: App,
  parameters: {
    docs: { page: null },
    layout: "padded",
  },
};

export default meta;

export const Component: Story = {};
/* eslint-enable */
