import React from "react";
import { render } from "@testing-library/react";
import { Icon } from "../src/index";

describe("snapshot Icon", () => {
  it("renders correctly", () => {
    const tree = render(<Icon>x</Icon>).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
