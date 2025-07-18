import React from "react";
import { Tabs } from "../index";
import { render } from "@testing-library/react";

describe("snapshot Tabs", () => {
  it("renders correctly", () => {
    const tree = render(
      <Tabs
        items={[
          { id: "1", heading: "item 1", content: "content 1" },
          { id: "2", heading: "item 2", content: "content 2" },
        ]}
      />,
    ).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
