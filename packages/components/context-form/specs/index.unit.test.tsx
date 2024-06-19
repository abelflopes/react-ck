import React from "react";
import { ContextForm } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit Context Form", () => {
  it("renders correctly", async () => {
    render(
      <ContextForm>
        <ContextForm.Input name="input" data-testid="input" />
      </ContextForm>,
    );
    const find = await screen.findByTestId("input");
    expect(find).toBeInTheDocument();
  });
});
