import React from "react";
import { Skeleton } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Unit Skeleton", () => {
  test("renders correctly", async () => {
    render(<Skeleton data-testid="skeleton" />);
    const find = await screen.findByTestId("skeleton");
    expect(find).toBeInTheDocument();
  });
});
