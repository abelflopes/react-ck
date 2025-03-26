import React from "react";
import { Button } from "../index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit Button", () => {
  it("renders correctly", async () => {
    const content = "Button";
    render(<Button>{content}</Button>);
    const find = await screen.findByText(content);
    expect(find).toBeInTheDocument();
  });
});
