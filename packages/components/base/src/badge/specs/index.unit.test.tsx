import React from "react";
import { Badge } from "../index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit Badge", () => {
  it("renders correctly", async () => {
    const content = "Badge";
    render(<Badge>{content}</Badge>);
    const find = await screen.findByText(content);
    expect(find).toBeInTheDocument();
  });
});
