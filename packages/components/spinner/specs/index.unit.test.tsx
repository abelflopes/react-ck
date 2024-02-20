import React from "react";
import { Spinner } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit Spinner", () => {
  it("renders correctly", async () => {
    render(<Spinner data-testid="spinner" />);
    const find = await screen.findByTestId("spinner");
    expect(find).toBeInTheDocument();
  });
});
