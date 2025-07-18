import React from "react";
import { Banner } from "../index";
import { render } from "@testing-library/react";

describe("snapshot Banner", () => {
  it("renders correctly", () => {
    const tree = render(<Banner src="some-image-url">Banner</Banner>).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
