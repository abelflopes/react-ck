import React from "react";
import { Pagination } from "../index";
import { getActRender } from "@react-ck/jest-config";

describe("snapshot Pagination", () => {
  it("renders correctly", async () => {
    const component = await getActRender(<Pagination current={10} slots={7} total={20} />);

    expect(component?.toJSON()).toMatchSnapshot();
  });
});
