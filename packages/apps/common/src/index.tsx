import "./index.scss";
import React from "react";
import { Manager, type ManagerProps, defaultTheme } from "react-ck";
import { DefaultRouter } from "./routes/Default";
import { type AppContextProps, AppContextProvider } from "./context/app";

const theme: NonNullable<NonNullable<ManagerProps["theme"]>["theme"]> = {
  ...defaultTheme,
  color: {
    ...defaultTheme.color,
    "highlight-primary": "#6565EC",
    "highlight-primary-light": "#F5F5FF",
    "highlight-primary-dark": "#5656b3",
  },
  font: {
    ...defaultTheme.font,
    family: "Inter, sans-serif",
  },
};

const el = document.querySelector("#root");

if (!el) throw new Error("Missing root element");

export type CommonAppProps = AppContextProps;

export const CommonApp = (props: Readonly<CommonAppProps>): React.ReactElement => (
  <Manager
    theme={{
      theme,
    }}>
    <AppContextProvider value={props}>
      <DefaultRouter />
    </AppContextProvider>
  </Manager>
);
