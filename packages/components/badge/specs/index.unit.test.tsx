import React from "react";
import { Badge } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Unit Badge", () => {
  test("renders correctly", async () => {
    const content = "Badge";
    render(<Badge>{content}</Badge>);
    const find = await screen.findByText(content);
    expect(find).toBeInTheDocument();
  });
});
