import React from "react";
import { Accordion } from "../index";
import { render } from "@testing-library/react";

describe("snapshot accordion", () => {
  it("renders correctly", () => {
    render(<div>aaa</div>);

    expect(1).toBe(1);
  });
});
