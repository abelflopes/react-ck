import React from "react";
import { Textarea } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Unit Textarea", () => {
  test("renders correctly", async () => {
    render(<Textarea data-testid="textarea" />);
    const find = await screen.findByTestId("textarea");
    expect(find).toBeInTheDocument();
  });
});
