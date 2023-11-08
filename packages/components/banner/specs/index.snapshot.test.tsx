import React from "react";
import { Banner } from "../src/index";
import renderer from "react-test-renderer";

describe("Snapshot Banner", () => {
  test("renders correctly", async () => {
    const tree = renderer.create(<Banner>Banner</Banner>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
