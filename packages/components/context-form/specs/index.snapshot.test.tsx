import React from "react";
import { ContextForm } from "../src/index";
import renderer from "react-test-renderer";

describe("snapshot Context Form", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <ContextForm>
          <ContextForm.Input
            name="username"
            label="Username"
            placeholder="JohnDoe"
            description="Add a respectful alias name"
          />

          <ContextForm.Input
            name="email"
            type="email"
            label="Email"
            placeholder="john-doe@company.com"
            defaultValue="aaaaaa.s"
            description="Add your email address"
            skin="negative"
            validationMessage="Invalid email"
          />

          <ContextForm.Textarea
            name="address"
            label="Address"
            placeholder="St John's st. 12"
            description="Add your residential address"
          />
        </ContextForm>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
