import React from "react";
import { Modal } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Unit Modal", () => {
  test("renders correctly", async () => {
    const content = "Modal";
    render(<Modal>{content}</Modal>);
    const find = await screen.findByText(content);
    expect(find).toBeInTheDocument();
  });
});
