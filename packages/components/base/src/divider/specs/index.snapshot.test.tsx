import React from "react";
import { Divider } from "../index";
import { render } from "@testing-library/react";

describe("snapshot Divider", () => {
  it("renders correctly", () => {
    const tree = render(<Divider />).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
