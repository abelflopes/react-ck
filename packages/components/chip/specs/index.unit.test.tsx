import React from "react";
import { Chip } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit Chip", () => {
  it("renders correctly", async () => {
    const content = "Chip";
    render(<Chip>{content}</Chip>);
    const find = await screen.findByText(content);
    expect(find).toBeInTheDocument();
  });
});
