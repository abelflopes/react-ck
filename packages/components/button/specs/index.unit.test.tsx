import React from "react";
import { Button } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Unit Button", () => {
  test("renders correctly", async () => {
    const content = "Button";
    render(<Button>{content}</Button>);
    const find = await screen.findByText(content);
    expect(find).toBeInTheDocument();
  });
});
