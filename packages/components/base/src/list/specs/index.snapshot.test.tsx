import React from "react";
import { List } from "../index";
import { render } from "@testing-library/react";

describe("snapshot List", () => {
  it("renders correctly", () => {
    const content = "List";
    const tree = render(<List items={[content]} />).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
