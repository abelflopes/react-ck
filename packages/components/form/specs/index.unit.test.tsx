import React from "react";
import { Form } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as LoginForm from "../fixtures/login";

describe("Unit Form", () => {
  test("renders correctly", async () => {
    render(
      <Form
        data-testid="form"
        fields={LoginForm.fields}
        validators={LoginForm.validators}
        values={LoginForm.values}
        onChange={() => undefined}
      />,
    );
    const find = await screen.findByTestId("form");
    expect(find).toBeInTheDocument();
  });
});
