import React from "react";
import { Accordion } from "../index";
import { render } from "@testing-library/react";

describe("snapshot accordion", () => {
  it("renders correctly", () => {
    const tree = render(
      <Accordion
        items={[
          { header: "item 1", children: "content 1" },
          { header: "item 2", children: "content 2" },
        ]}
        keepInDom
      />,
    ).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
