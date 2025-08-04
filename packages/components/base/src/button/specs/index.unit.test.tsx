import React from "react";
import { Button } from "../index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit Button", () => {
  it("renders correctly", async () => {
    const content = "Button";
    render(<Button>{content}</Button>);
    const find = await screen.findByText(content);
    expect(find).toBeInTheDocument();
  });

  describe("ref forwarding", () => {
    it("should forward ref to button element", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(
        <Button ref={ref} data-testid="button">
          Button
        </Button>,
      );

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current).toHaveAttribute("data-testid", "button");
    });

    it("should allow accessing button methods via ref", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(
        <Button ref={ref} data-testid="button">
          Button
        </Button>,
      );

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(typeof ref.current?.focus).toBe("function");
      expect(typeof ref.current?.blur).toBe("function");
      expect(typeof ref.current?.click).toBe("function");
    });
  });
});
