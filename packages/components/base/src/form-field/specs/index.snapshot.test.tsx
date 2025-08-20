import React from "react";
import { FormField } from "../index";
import { render } from "@testing-library/react";
import { Manager } from "@react-ck/manager";

describe("snapshot FormField", () => {
  it("renders correctly", () => {
    const tree = render(
      <Manager>
        <FormField>FormField</FormField>
      </Manager>,
    ).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
