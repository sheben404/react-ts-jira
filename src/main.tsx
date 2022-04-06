import "./wdyr.ts";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { loadDevTools, DevTools } from "./service-worker";
import "antd/dist/antd.less";
import { AppProviders } from "./context";

loadDevTools(() =>
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <DevTools />
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  )
);
