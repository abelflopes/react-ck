import React from "react";
import { FormField } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit FormField", () => {
  it("renders correctly", async () => {
    const content = "FormField";
    render(<FormField>{content}</FormField>);
    const find = await screen.findByText(content);
    expect(find).toBeInTheDocument();
  });
});
