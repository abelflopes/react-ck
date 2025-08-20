import React from "react";
import { FormField } from "../index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Manager } from "@react-ck/manager";

describe("unit FormField", () => {
  it("renders correctly", async () => {
    const content = "FormField";
    render(
      <Manager>
        <FormField>{content}</FormField>
      </Manager>,
    );
    const find = await screen.findByText(content);
    expect(find).toBeInTheDocument();
  });
});
