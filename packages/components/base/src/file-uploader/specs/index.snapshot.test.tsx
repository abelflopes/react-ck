import React from "react";
import { FileUploader } from "../FileUploader";
import { render } from "@testing-library/react";

describe("snapshot FileUploader", () => {
  it("should match snapshot", () => {
    const { container } = render(<FileUploader />);
    expect(container).toMatchSnapshot();
  });
});
