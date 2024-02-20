import React from "react";
import { Input } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit Input", () => {
  it("renders correctly", async () => {
    render(<Input data-testid="input" />);
    const find = await screen.findByTestId("input");
    expect(find).toBeInTheDocument();
  });
});
