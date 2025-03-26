import React from "react";
import { Banner } from "../index";
import renderer from "react-test-renderer";

describe("snapshot Banner", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Banner src="some-image-url">Banner</Banner>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
