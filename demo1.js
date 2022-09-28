//import { serveAPI } from "https://code4fukui.github.io/webserver/webserver.js";
import { serveAPI } from "./webserver.js";

serveAPI("/api", async (param) => {
  return { response: "OK", param };
});
