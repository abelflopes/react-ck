import React from "react";
import { Card } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit Card", () => {
  it("renders correctly", async () => {
    const content = "Card";
    render(<Card>{content}</Card>);
    const find = await screen.findByText(content);
    expect(find).toBeInTheDocument();
  });
});
