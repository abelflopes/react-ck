import React from "react";
import { Progress } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Unit Progress", () => {
  test("renders correctly", async () => {
    render(<Progress data-testid="progress" value={50} />);
    const find = await screen.findByTestId("progress");
    expect(find).toBeInTheDocument();
  });
});
