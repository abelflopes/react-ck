import React from "react";
import { render } from "@testing-library/react";
import { Select } from "../index";

describe("snapshot Select", () => {
  it("renders correctly", () => {
    const tree = render(<Select />).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
