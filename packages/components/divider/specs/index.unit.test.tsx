import React from "react";
import { Divider } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Unit Divider", () => {
  test("renders correctly", async () => {
    render(<Divider data-testid="divider" />);
    const find = await screen.findByTestId("divider");
    expect(find).toBeInTheDocument();
  });
});
