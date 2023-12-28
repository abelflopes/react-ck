import React from "react";
import { EmptyState } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Unit EmptyState", () => {
  test("renders correctly", async () => {
    const content = "EmptyState";
    render(<EmptyState>{content}</EmptyState>);
    const find = await screen.findByText(content);
    expect(find).toBeInTheDocument();
  });
});
