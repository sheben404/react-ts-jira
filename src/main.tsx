import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { loadDevTools } from "./service-worker";

loadDevTools(() =>
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  )
);
