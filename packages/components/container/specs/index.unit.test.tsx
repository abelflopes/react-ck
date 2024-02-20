import React from "react";
import { Container } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit Container", () => {
  it("renders correctly", async () => {
    const content = "Container";
    render(<Container>{content}</Container>);
    const find = await screen.findByText(content);
    expect(find).toBeInTheDocument();
  });
});
