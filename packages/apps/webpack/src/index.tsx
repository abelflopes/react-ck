import React from "react";
import { createRoot } from "react-dom/client";
import { CommonApp } from "@react-ck/common-app";

const el = document.querySelector("#root");

if (!el) throw new Error("Missing root element");

const App = (): React.ReactElement => (
  <React.StrictMode>
    <CommonApp title="Webpack App" />
  </React.StrictMode>
);

const root = createRoot(el);

root.render(<App />);
