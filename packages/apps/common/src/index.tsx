import "./index.scss";
import React from "react";
import { Manager } from "react-ck";
import { DefaultRouter } from "./routes/Default";
import { type AppContextProps, AppContextProvider } from "./context/app";

const el = document.querySelector("#root");

if (!el) throw new Error("Missing root element");

export type CommonAppProps = AppContextProps;

export const CommonApp = (props: Readonly<CommonAppProps>): React.ReactElement => (
  <Manager>
    <AppContextProvider value={props}>
      <DefaultRouter />
    </AppContextProvider>
  </Manager>
);
