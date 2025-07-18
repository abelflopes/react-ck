import React from "react";
import { Input } from "../index";
import { render } from "@testing-library/react";

describe("snapshot Input", () => {
  it("renders correctly", () => {
    const tree = render(<Input />).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
