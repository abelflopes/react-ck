import React from "react";
import { Pagination } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Unit Pagination", () => {
  test("renders correctly", async () => {
    const content = "Pagination";
    render(<Pagination current={10} slots={7} total={20} />);
    const find = await screen.findByText(content);
    expect(find).toBeInTheDocument();
  });
});
