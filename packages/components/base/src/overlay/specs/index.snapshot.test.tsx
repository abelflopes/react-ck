import React from "react";
import { Overlay } from "../index";
import { render } from "@testing-library/react";

describe("snapshot Overlay", () => {
  it("renders correctly", () => {
    const tree = render(<Overlay skin="dark" />).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
