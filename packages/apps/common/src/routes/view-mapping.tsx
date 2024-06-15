import React from "react";
import { type RouteProps } from "react-router-dom";
import { type RouteIndex } from "./routes-list";
import { RedirectView } from "./Redirect";

import { ErrorPage } from "../pages/Error";
import { HomePage } from "../pages/Home";
import { LoginPage } from "../pages/Login";
import { TermsOfServicePage } from "../pages/TermsOfService";
import { PrivacyPolicyPage } from "../pages/PrivacyPolicy";
import { QuotePage } from "../pages/Quote";

type ViewsMap = { [key in RouteIndex]: NonNullable<RouteProps["Component"]> };

export const viewsMap: ViewsMap = {
  root: () => <RedirectView to="home" />,
  home: () => <HomePage />,
  termsOfService: () => <TermsOfServicePage />,
  privacyPolicy: () => <PrivacyPolicyPage />,
  login: () => <LoginPage />,
  quote: () => <QuotePage />,
  error: () => <ErrorPage />,
};
