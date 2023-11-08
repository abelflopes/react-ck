import React from "react";
import { Overlay } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Unit Overlay", () => {
  test("renders correctly", async () => {
    const content = "Overlay";
    render(<Overlay skin="dark" />);
    const find = await screen.findByText(content);
    expect(find).toBeInTheDocument();
  });
});
