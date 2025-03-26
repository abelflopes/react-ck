import React from "react";
import { Container } from "../index";
import renderer from "react-test-renderer";

describe("snapshot Container", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Container>Container</Container>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
