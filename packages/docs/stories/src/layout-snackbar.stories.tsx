/* eslint-disable react/no-multi-comp -- demo page */
import React, { useEffect, useCallback } from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { Snackbar, type SnackbarProps, useSnackbar } from "@react-ck/provisional/src";
import { Alert } from "@react-ck/alert/src";
import { Text } from "@react-ck/text";
import { Button } from "@react-ck/button";
import { Card } from "@react-ck/card";

const MyComponent = (): React.ReactElement => {
  const snackbar = useSnackbar();

  const handleButtonClick = useCallback(
    () =>
      snackbar.add(
        (id) => (
          <Card skin="shadowed">
            {faker.lorem.sentences()}
            &nbsp;
            <Button
              size="xs"
              onClick={() => {
                snackbar.remove(id);
              }}>
              Remove
            </Button>
          </Card>
        ),
        { duration: "short" },
      ),
    [snackbar],
  );

  useEffect(() => {
    const items: string[] = [];

    items.push(
      snackbar.add((id) => (
        <Alert
          heading={faker.lorem.sentence()}
          onDismiss={() => {
            snackbar.remove(id);
          }}>
          {id}
          {faker.lorem.sentences()}
        </Alert>
      )),
    );

    items.push(
      snackbar.add((id) => (
        <Alert
          skin="average"
          autoDismiss={5000}
          onDismiss={() => {
            snackbar.remove(id);
          }}>
          Dismissable after 5s
        </Alert>
      )),
    );

    return () => {
      items.forEach(snackbar.remove);
    };
  }, [snackbar]);

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
  <Manager usePortal={false}>
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
