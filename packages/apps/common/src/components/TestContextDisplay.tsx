import React from "react";
import { Snippet } from "react-ck";
import { useTestContext } from "../context/test";
import { useInRouterContext, useLocation } from "react-router-dom";

export const TestContextDisplay = (): React.ReactElement => {
  const data = useTestContext();

  const inRouteContext = useInRouterContext();
  const location = useLocation();

  return <Snippet>{JSON.stringify({ ...data, inRouteContext, location }, null, 2)}</Snippet>;
};
