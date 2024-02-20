import React from "react";
import { Badge } from "../src/index";
import renderer from "react-test-renderer";

describe("snapshot Badge", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Badge>Badge</Badge>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
