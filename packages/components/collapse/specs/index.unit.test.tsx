import React from "react";
import { Collapse } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit Collapse", () => {
  it("renders correctly", async () => {
    const content = "Collapse";
    render(
      <Collapse header="Header" keepInDom>
        {content}
      </Collapse>,
    );
    const find = await screen.findByText(content);
    expect(find).toBeInTheDocument();
  });
});
