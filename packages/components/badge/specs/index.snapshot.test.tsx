import React from "react";
import { Badge } from "../src/index";
import renderer from "react-test-renderer";

describe("Snapshot Badge", () => {
  test("renders correctly", async () => {
    const tree = renderer.create(<Badge>Badge</Badge>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
