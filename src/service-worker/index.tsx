import { startServer } from "./server/index.js";
import { installDevTool } from "./dev-tool";

export const loadDevTools = (callback: () => void) => {
  startServer();
  installDevTool();
  if (callback) {
    callback();
  }
};
