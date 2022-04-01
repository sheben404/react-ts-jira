import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { loadDevTools } from "./service-worker";
import { AppProviders } from "./context";

loadDevTools(() =>
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  )
);
