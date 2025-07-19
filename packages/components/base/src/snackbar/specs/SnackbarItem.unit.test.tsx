import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SnackbarItem } from "../SnackbarItem";

describe("unit SnackbarItem", () => {
  it("renders correctly with children", async () => {
    const content = "Snackbar Item Content";
    render(<SnackbarItem data-testid="snackbar-item">{content}</SnackbarItem>);

    const item = await screen.findByTestId("snackbar-item");
    expect(item).toBeInTheDocument();
    expect(item).toHaveTextContent(content);
  });

  it("applies custom className", async () => {
    const customClass = "custom-snackbar-item-class";
    render(
      <SnackbarItem className={customClass} data-testid="snackbar-item">
        Test Content
      </SnackbarItem>,
    );

    const item = await screen.findByTestId("snackbar-item");
    expect(item).toHaveClass(customClass);
  });

  it("passes through other props", async () => {
    render(
      <SnackbarItem data-testid="snackbar-item" data-custom-attr="custom-value">
        Test Content
      </SnackbarItem>,
    );

    const item = await screen.findByTestId("snackbar-item");
    expect(item).toHaveAttribute("data-custom-attr", "custom-value");
  });

  it("renders without children", async () => {
    render(<SnackbarItem data-testid="snackbar-item" />);

    const item = await screen.findByTestId("snackbar-item");
    expect(item).toBeInTheDocument();
  });
});
