//import { serveAPI } from "https://code4fukui.github.io/wsutil/wsutil.js";
import { serveAPI } from "./wsutil.js";

serveAPI("/api", async (param, req) => {
  return { response: "OK", param, req };
});