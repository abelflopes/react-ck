import React from "react";
import { Overlay } from "../index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit Overlay", () => {
  it("renders correctly", async () => {
    render(<Overlay skin="dark" data-testid="overlay" />);
    const find = await screen.findByTestId("overlay");
    expect(find).toBeInTheDocument();
  });

  describe("ref forwarding", () => {
    it("should forward ref to div element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Overlay ref={ref} skin="dark" data-testid="overlay" />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute("data-testid", "overlay");
    });

    it("should allow accessing div methods via ref", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Overlay ref={ref} skin="dark" data-testid="overlay" />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(typeof ref.current?.focus).toBe("function");
      expect(typeof ref.current?.blur).toBe("function");
      expect(typeof ref.current?.click).toBe("function");
    });
  });

  describe("overlay functionality", () => {
    it("should apply correct skin class", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Overlay ref={ref} skin="light" data-testid="overlay" />);

      expect(ref.current).toHaveClass("light");
    });

    it("should apply blur class when blur is true", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Overlay ref={ref} skin="dark" blur={true} data-testid="overlay" />);

      expect(ref.current).toHaveClass("blur");
    });

    it("should not apply blur class when blur is false", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Overlay ref={ref} skin="dark" blur={false} data-testid="overlay" />);

      expect(ref.current).not.toHaveClass("blur");
    });
  });
});
