import React from "react";
import { Dropdown } from "../Dropdown";
import { render } from "@testing-library/react";

describe("snapshot Dropdown", () => {
  it("should match snapshot", () => {
    const anchorRef = React.createRef<HTMLDivElement>();
    const { container } = render(
      <Dropdown anchorRef={anchorRef} open={true}>
        <div>Dropdown content</div>
      </Dropdown>,
    );
    expect(container).toMatchSnapshot();
  });
});
