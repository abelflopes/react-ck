import React from "react";
import { Spinner } from "../index";
import { render } from "@testing-library/react";

describe("snapshot Spinner", () => {
  it("renders correctly", () => {
    const tree = render(<Spinner />).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
