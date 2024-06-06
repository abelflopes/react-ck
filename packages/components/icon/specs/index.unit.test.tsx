import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Icon } from "../src/index";
import { IconBellFill } from "../src/icons/IconBellFill";

describe("unit Icon", () => {
  it("renders correctly", async () => {
    render(<Icon Icon={IconBellFill} data-testid="icon" />);
    const find = await screen.findByTestId("icon");
    expect(find).toBeInTheDocument();
  });
});
