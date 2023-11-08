import React from "react";
import { Collapse } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Unit Collapse", () => {
  test("renders correctly", async () => {
    const content = "Collapse";
    render(<Collapse>{content}</Collapse>);
    const find = await screen.findByText(content);
    expect(find).toBeInTheDocument();
  });
});
