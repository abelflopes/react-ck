import React from "react";
import { Accordion } from "../src/index";
import renderer from "react-test-renderer";

describe("snapshot accordion", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Accordion
          items={[
            { header: "item 1", children: "content 1" },
            { header: "item 2", children: "content 2" },
          ]}
          keepInDom
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
