import React from "react";
import { Modal } from "../src/index";
import renderer from "react-test-renderer";

describe("Snapshot Modal", () => {
  test("renders correctly", async () => {
    const tree = renderer.create(<Modal>Modal</Modal>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
