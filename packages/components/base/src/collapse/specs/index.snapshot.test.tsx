import React from "react";
import { Collapse } from "../index";
import { render } from "@testing-library/react";

describe("snapshot Collapse", () => {
  it("renders correctly", () => {
    const tree = render(
      <Collapse header="Header" keepInDom>
        Collapse
      </Collapse>,
    ).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
