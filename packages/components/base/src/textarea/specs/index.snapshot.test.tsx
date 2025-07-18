import React from "react";
import { Textarea } from "../index";
import { render } from "@testing-library/react";

describe("snapshot Textarea", () => {
  it("renders correctly", () => {
    const tree = render(<Textarea />).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
