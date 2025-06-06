import React from "react";
import { Pagination } from "../index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit Pagination", () => {
  it("renders correctly", async () => {
    const testId = "pagination";
    render(<Pagination data-testid={testId} current={10} slots={7} total={20} />);
    const find = await screen.findByTestId(testId);
    expect(find).toBeInTheDocument();
  });
});
