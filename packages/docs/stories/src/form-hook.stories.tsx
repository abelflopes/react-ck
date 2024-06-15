import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { useForm } from "@react-ck/form/src";
import * as LoginForm from "@react-ck/form/fixtures/login";
import { Grid } from "@react-ck/grid";
import { Card } from "@react-ck/card";
import { Container } from "@react-ck/container";
import { Text } from "@react-ck/text";
import { capitalCase } from "change-case";

type Story = StoryObj<typeof useForm>;

const meta: Meta<typeof useForm> = {
  title: "Form/Form/Form Hook",
  ...configureStory(
    useForm,
    {
      parameters: {
        layout: "padded",
        docs: {
          source: {
            type: "code",
          },
        },
      },
      decorators: [
        (Story): React.ReactElement => (
          <Manager>
            <Story />
          </Manager>
        ),
      ],
    },
    {
      type: "Hook",
    },
  ),
};

export default meta;

export const Component: Story = {
  /* eslint-disable react-hooks/rules-of-hooks -- lint unable to identify that component is react */
  render: (): React.ReactElement => {
    const { form, initialValues, validity, values } = useForm({
      fields: LoginForm.fields,
      validators: LoginForm.validators,
      initialValues: LoginForm.values,
    });

    return (
      <>
        <Container spacingX={false} spacingY>
          {form}
        </Container>

        <Grid>
          {Object.entries({ initialValues, validity, values }).map(([title, obj]) => (
            <Grid.Column key={title}>
              <Card>
                <Text variation="h3">{capitalCase(title)}</Text>

                <code style={{ whiteSpace: "pre" }}>{JSON.stringify(obj, undefined, 2)}</code>
              </Card>
            </Grid.Column>
          ))}
        </Grid>
      </>
    );
  },
  /* eslint-enable */
};
