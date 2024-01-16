import React from "react";
import { Form } from "../src/index";
import renderer, { act, type ReactTestRenderer } from "react-test-renderer";
import * as LoginForm from "../fixtures/login";

describe("Snapshot Form", () => {
  test("renders correctly", async () => {
    let component: ReactTestRenderer | undefined;

    await act(() => {
      component = renderer.create(
        <Form
          fields={LoginForm.fields}
          validators={LoginForm.validators}
          values={LoginForm.values}
          onChange={() => undefined}
        />,
      );
    });

    expect(component?.toJSON()).toMatchSnapshot();
  });
});
