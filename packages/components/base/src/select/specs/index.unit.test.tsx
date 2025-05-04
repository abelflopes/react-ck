import React from "react";
import { Select } from "../index";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockResizeObserver } from "./mocks";
// eslint-disable-next-line workspaces/require-dependency -- testing purposes only
import { Manager } from "@react-ck/manager/src";

/**
 * This test is mostly aimed to ensure that the keeps a native-like behaviour
 */

describe("unit Select", () => {
  beforeAll(() => {
    mockResizeObserver();

    // make RAF synchronous so that position engine renders immediately
    Object.defineProperty(window, "requestAnimationFrame", {
      writable: true,
      value: (cb: () => void) => {
        cb();
      },
    });
  });

  it("renders correctly", async () => {
    render(<Select data-testid="select" />);
    const find = await screen.findByTestId("select");
    expect(find).toBeInTheDocument();
  });

  it("should get default value", () => {
    const value = "123";
    render(
      <Select data-testid="select" defaultValue={value}>
        <Select.Option>000</Select.Option>
        <Select.Option selected>{value}</Select.Option>
      </Select>,
    );
    const find = screen.getByDisplayValue<HTMLSelectElement>(value);
    expect(find.value).toBe(value);
  });

  it("should get set value", () => {
    const value = "123";
    render(
      <Select data-testid="select" value={value}>
        <Select.Option>000</Select.Option>
        <Select.Option selected>{value}</Select.Option>
      </Select>,
    );
    const find = screen.queryByDisplayValue<HTMLSelectElement>(value);

    expect(find).toBeInTheDocument();
    expect(find?.value).toBe(value);
  });

  it("should not fire onchange by default", () => {
    const value = "123";
    const handleChange = jest.fn();

    render(
      <Select data-testid="select" value={value} onChange={handleChange}>
        <Select.Option>000</Select.Option>
        <Select.Option selected>{value}</Select.Option>
      </Select>,
    );
    const find = screen.getByDisplayValue<HTMLSelectElement>(value);

    expect(find.value).toBe(value);
    expect(handleChange).toHaveBeenCalledTimes(0);
  });

  it.skip("should fire onchange", () => {
    const initialValue = "000";
    const value = "123";
    const handleChange = jest.fn();

    const r = render(
      <Manager>
        <Select data-testid="select" value={initialValue} onChange={handleChange}>
          <Select.Option>{initialValue}</Select.Option>
          <Select.Option>{value}</Select.Option>
        </Select>
      </Manager>,
    );

    const root = screen.getByTestId("select");

    // Open select
    fireEvent.focus(root);

    const [, option2] = r.baseElement.querySelectorAll("li");

    if (option2) fireEvent.click(option2);

    const nativeElement = screen.getByDisplayValue<HTMLSelectElement>(value);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(nativeElement.value).toBe(value);
  });
});
