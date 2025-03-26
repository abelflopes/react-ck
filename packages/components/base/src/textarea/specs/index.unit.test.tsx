import React from "react";
import { Textarea } from "../index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit Textarea", () => {
  it("renders correctly", async () => {
    render(<Textarea data-testid="textarea" />);
    const find = await screen.findByTestId("textarea");
    expect(find).toBeInTheDocument();
  });
});
