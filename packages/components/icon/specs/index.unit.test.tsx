import React from "react";
import { Icon, IconBellFill } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit Icon", () => {
  it("renders correctly", async () => {
    render(<Icon Icon={IconBellFill} data-testid="icon" />);
    const find = await screen.findByTestId("icon");
    expect(find).toBeInTheDocument();
  });
});
