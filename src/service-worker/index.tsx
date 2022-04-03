import { startServer } from "./server/index.js";
import { DevTool } from "./dev-tool";

export const loadDevTools = (callback: () => void) => {
  startServer();
  if (callback) {
    callback();
  }
};

export const DevTools = DevTool;
