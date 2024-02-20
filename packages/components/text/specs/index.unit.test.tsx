import React from "react";
import { Text } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit Text", () => {
  it("renders correctly", async () => {
    const content = "Text";
    render(<Text>{content}</Text>);
    const find = await screen.findByText(content);
    expect(find).toBeInTheDocument();
  });
});
