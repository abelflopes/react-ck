import React from "react";
import { Form } from "../src/index";
import * as LoginForm from "../fixtures/login";
import { getActRender } from "@react-ck/jest-config";

describe("snapshot Form", () => {
  it("renders correctly", async () => {
    const component = await getActRender(
      <Form
        fields={LoginForm.fields}
        validators={LoginForm.validators}
        values={LoginForm.values}
        onChange={() => undefined}
      />,
    );

    expect(component?.toJSON()).toMatchSnapshot();
  });
});
