import React from "react";
import { Container } from "../src/index";
import renderer from "react-test-renderer";

describe("Snapshot Container", () => {
  test("renders correctly", async () => {
    const tree = renderer.create(<Container>Container</Container>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
