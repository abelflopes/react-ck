import React from "react";
import { Skeleton } from "../index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit Skeleton", () => {
  it("renders correctly", async () => {
    render(<Skeleton data-testid="skeleton" />);
    const find = await screen.findByTestId("skeleton");
    expect(find).toBeInTheDocument();
  });
});
