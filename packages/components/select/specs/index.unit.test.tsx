import React from "react";
import { Select } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Unit Select", () => {
  test("renders correctly", async () => {
    render(<Select data-testid="select" />);
    const find = await screen.findByTestId("select");
    expect(find).toBeInTheDocument();
  });
});
