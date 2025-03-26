import React from "react";
import { Banner } from "../index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit Banner", () => {
  it("renders correctly", async () => {
    const content = "Banner";
    render(<Banner src="some-image-url">{content}</Banner>);
    const find = await screen.findByText(content);
    expect(find).toBeInTheDocument();
  });
});
