import React from "react";
import { type RouteProps } from "react-router-dom";
import { type RouteIndex } from "./routes-list";
import { RedirectView } from "./Redirect";

import { ErrorPage } from "../pages/Error";
import { HomePage } from "../pages/Home";
import { TestPage } from "../pages/Test";

type ViewsMap = { [key in RouteIndex]: NonNullable<RouteProps["Component"]> };

export const viewsMap: ViewsMap = {
  root: () => <RedirectView to="home" />,
  home: () => <HomePage />,
  test: () => <TestPage />,
  error: () => <ErrorPage />,
};
