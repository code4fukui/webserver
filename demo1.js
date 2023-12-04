//import { serveAPI } from "https://code4fukui.github.io/wsutil/wsutil.js";
import { serveAPI } from "./wsutil.js";

export const server = await serveAPI("/api", async (param, req, path, conninfo) => {
  //return { response: "OK", param, req, path, conninfo };
  return { response: "OK", param };
});
