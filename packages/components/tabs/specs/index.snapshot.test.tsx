import React from "react";
import { Tabs } from "../src/index";
import renderer from "react-test-renderer";

describe("Snapshot Tabs", () => {
  test("renders correctly", async () => {
    const tree = renderer
      .create(
        <Tabs
          items={[
            { heading: "item 1", content: "content 1" },
            { heading: "item 2", content: "content 2" },
          ]}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
