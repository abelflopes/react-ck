import React from "react";
import { Overlay } from "../index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit Overlay", () => {
  it("renders correctly", async () => {
    render(<Overlay skin="dark" data-testid="overlay" />);
    const find = await screen.findByTestId("overlay");
    expect(find).toBeInTheDocument();
  });
});
