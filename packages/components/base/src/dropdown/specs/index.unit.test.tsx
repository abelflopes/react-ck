import React, { act } from "react";
import { Dropdown } from "../Dropdown";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
// eslint-disable-next-line workspaces/no-relative-imports, workspaces/require-dependency -- this is a test
import { Manager } from "../../../../../providers/manager/src";

describe("unit Dropdown", () => {
  it.only("renders correctly when open", async () => {
    const anchorRef = React.createRef<HTMLDivElement>();

    act(() => {
      render(
        <Manager>
          <div ref={anchorRef}>anchor</div>

          <Dropdown anchorRef={anchorRef} open={true} data-testid="dropdown">
            <div>Dropdown content</div>
          </Dropdown>
        </Manager>,
      );
    });

    const find = await screen.findByTestId("dropdown");
    expect(find).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    const anchorRef = React.createRef<HTMLDivElement>();

    act(() => {
      render(
        <Manager>
          <div ref={anchorRef}>anchor</div>

          <Dropdown anchorRef={anchorRef} open={false} data-testid="dropdown">
            <div>Dropdown content</div>
          </Dropdown>
        </Manager>,
      );
    });

    const find = screen.queryByTestId("dropdown");
    expect(find).not.toBeInTheDocument();
  });

  describe("ref forwarding", () => {
    it.skip("should forward ref to dropdown element", async () => {
      const anchorRef = React.createRef<HTMLDivElement>();
      const ref = React.createRef<HTMLDivElement>();

      act(() => {
        render(
          <Manager>
            <div ref={anchorRef}>anchor</div>

            <Dropdown anchorRef={anchorRef} open={true} ref={ref} data-testid="dropdown">
              <div>Dropdown content</div>
            </Dropdown>
          </Manager>,
        );
      });

      expect(ref.current).not.toBeFalsy();
      expect(ref.current).toHaveAttribute("data-testid", "dropdown");
    });

    it.skip("should allow accessing dropdown methods via ref", () => {
      const anchorRef = React.createRef<HTMLDivElement>();
      const ref = React.createRef<HTMLDivElement>();

      act(() => {
        render(
          <Manager>
            <div ref={anchorRef}>anchor</div>

            <Dropdown anchorRef={anchorRef} open={true} ref={ref} data-testid="dropdown">
              <div>Dropdown content</div>
            </Dropdown>
          </Manager>,
        );
      });

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(typeof ref.current?.focus).toBe("function");
      expect(typeof ref.current?.blur).toBe("function");
      expect(typeof ref.current?.click).toBe("function");
    });
  });
});
