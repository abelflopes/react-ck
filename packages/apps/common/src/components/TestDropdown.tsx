import React from "react";
import { Button, DropdownButton } from "react-ck";
import { TestContextDisplay } from "./TestContextDisplay";
import { Link } from "react-router-dom";
import { routesList } from "../routes/routes-list";

export const TestDropdown = (): React.ReactElement => {
  return (
    <DropdownButton
      renderButton={({ ref, onOpen }) => (
        <Button ref={ref} onClick={onOpen} skin="secondary" skinVariation="muted">
          Test Dropdown
        </Button>
      )}>
      <TestContextDisplay />

      <Link to={routesList.test}>Test</Link>
    </DropdownButton>
  );
};
