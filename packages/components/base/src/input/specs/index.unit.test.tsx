import React from "react";
import { Input } from "../index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit Input", () => {
  it("renders correctly", async () => {
    render(<Input data-testid="input" />);
    const find = await screen.findByTestId("input");
    expect(find).toBeInTheDocument();
  });

  describe("ref forwarding", () => {
    it("should forward ref to input element", () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} data-testid="input" />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current).toHaveAttribute("data-testid", "input");
    });

    it("should allow accessing input methods via ref", () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} data-testid="input" />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(typeof ref.current?.focus).toBe("function");
      expect(typeof ref.current?.blur).toBe("function");
      expect(typeof ref.current?.select).toBe("function");
    });
  });
});
