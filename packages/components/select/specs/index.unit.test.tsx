import React from "react";
import { Select } from "../src/index";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit Select", () => {
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

  it("should get set", () => {
    const value = "123";
    render(
      <Select data-testid="select" value={value}>
        <Select.Option>000</Select.Option>
        <Select.Option selected>{value}</Select.Option>
      </Select>,
    );
    const find = screen.getByDisplayValue<HTMLSelectElement>(value);
    expect(find.value).toBe(value);
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

  it("should fire onchange", () => {
    const initialValue = "000";
    const value = "123";
    const handleChange = jest.fn();

    render(
      <Select data-testid="select" onChange={handleChange}>
        <Select.Option>{initialValue}</Select.Option>
        <Select.Option>{value}</Select.Option>
      </Select>,
    );
    const find = screen.getByDisplayValue<HTMLSelectElement>(initialValue);
    const option1 = find.getElementsByTagName("option").item(0);
    const option2 = find.getElementsByTagName("option").item(1);

    fireEvent.change(find, { target: { value } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(option1?.selected).toBe(false);
    expect(option2?.selected).toBe(true);
  });
});
