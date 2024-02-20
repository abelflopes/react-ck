import React from "react";
import { Icon } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit Icon", () => {
  it("renders correctly", async () => {
    render(<Icon name="bell-filled" data-testid="icon" />);
    const find = await screen.findByTestId("icon");
    expect(find).toBeInTheDocument();
  });
});
