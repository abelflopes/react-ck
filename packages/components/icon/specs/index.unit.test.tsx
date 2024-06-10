import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Icon } from "../src/index";

describe("unit Icon", () => {
  it("renders correctly", async () => {
    render(
      <Icon data-testid="icon">
        <Icon>x</Icon>
      </Icon>,
    );
    const find = await screen.findByTestId("icon");
    expect(find).toBeInTheDocument();
  });
});
