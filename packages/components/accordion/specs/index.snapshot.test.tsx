import React from "react";
import { Accordion } from "../src/index";
import renderer from "react-test-renderer";

describe("Snapshot Accordion", () => {
  test("renders correctly", async () => {
    const tree = renderer
      .create(
        <Accordion
          items={[
            { header: "item 1", children: "content 1" },
            { header: "item 2", children: "content 2" },
          ]}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
