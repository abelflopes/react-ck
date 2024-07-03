import React from "react";
import { Autocomplete } from "../src/index";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit Autocomplete", () => {
  it("renders correctly", async () => {
    render(<Autocomplete data-testid="autocomplete" />);
    const find = await screen.findByTestId("autocomplete");
    expect(find).toBeInTheDocument();
  });

  it("should get default value", () => {
    const value = "123";
    render(
      <Autocomplete data-testid="autocomplete" defaultValue={value}>
        <Autocomplete.Option>000</Autocomplete.Option>
        <Autocomplete.Option autocompleteed>{value}</Autocomplete.Option>
      </Autocomplete>,
    );
    const find = screen.getByDisplayValue<HTMLAutocompleteElement>(value);
    expect(find.value).toBe(value);
  });

  it("should get set", () => {
    const value = "123";
    render(
      <Autocomplete data-testid="autocomplete" value={value}>
        <Autocomplete.Option>000</Autocomplete.Option>
        <Autocomplete.Option autocompleteed>{value}</Autocomplete.Option>
      </Autocomplete>,
    );
    const find = screen.getByDisplayValue<HTMLAutocompleteElement>(value);
    expect(find.value).toBe(value);
  });

  it("should not fire onchange by default", () => {
    const value = "123";
    const handleChange = jest.fn();

    render(
      <Autocomplete data-testid="autocomplete" value={value} onChange={handleChange}>
        <Autocomplete.Option>000</Autocomplete.Option>
        <Autocomplete.Option autocompleteed>{value}</Autocomplete.Option>
      </Autocomplete>,
    );
    const find = screen.getByDisplayValue<HTMLAutocompleteElement>(value);

    expect(find.value).toBe(value);
    expect(handleChange).toHaveBeenCalledTimes(0);
  });

  it("should fire onchange", () => {
    const initialValue = "000";
    const value = "123";
    const handleChange = jest.fn();

    render(
      <Autocomplete data-testid="autocomplete" onChange={handleChange}>
        <Autocomplete.Option>{initialValue}</Autocomplete.Option>
        <Autocomplete.Option>{value}</Autocomplete.Option>
      </Autocomplete>,
    );
    const find = screen.getByDisplayValue<HTMLAutocompleteElement>(initialValue);
    const option1 = find.getElementsByTagName("option").item(0);
    const option2 = find.getElementsByTagName("option").item(1);

    fireEvent.change(find, { target: { value } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(option1?.autocompleteed).toBe(false);
    expect(option2?.autocompleteed).toBe(true);
  });
});
