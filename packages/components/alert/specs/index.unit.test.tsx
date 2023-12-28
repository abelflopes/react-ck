import React from "react";
import { Alert } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Unit Alert", () => {
  test("renders correctly", async () => {
    const content = "Alert";
    render(<Alert>{content}</Alert>);
    const find = await screen.findByText(content);
    expect(find).toBeInTheDocument();
  });
});
